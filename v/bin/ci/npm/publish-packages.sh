#!/bin/bash

# Configuration
BATCH_SIZE=5        # Number of packages to publish in each batch
BATCH_DELAY=300     # Delay between batches in seconds (5 minutes)
RETRY_DELAY=60      # Delay between retries in seconds
MAX_RETRIES=3       # Maximum number of retry attempts
JSON_FILE="publish-check-result.json"
LOG_FILE="publish-log.txt"
TEMP_DIR="/tmp/npm-publish-$$"
ERROR_COUNT=0
SUCCESS_COUNT=0

# Cleanup function
cleanup() {
    rm -rf "$TEMP_DIR"
    log_message "Script terminated. Successful: $SUCCESS_COUNT, Failed: $ERROR_COUNT"
    exit "${1:-0}"
}

trap cleanup SIGINT SIGTERM EXIT

# Function to log messages with timestamp
log_message() {
    local level=${2:-INFO}
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $1" | tee -a "$LOG_FILE"
}

# Function to validate JSON file
validate_json() {
    if ! jq empty "$JSON_FILE" 2>/dev/null; then
        log_message "Invalid JSON file: $JSON_FILE" ERROR
        return 1
    fi
    return 0
}

# Function to publish a package with retries
publish_package() {
    local package_name="$1"
    local package_dir="$2"
    local current_version="$3"
    local next_version="$4"
    local retry_count=0

    while [ $retry_count -lt $MAX_RETRIES ]; do
        log_message "Attempting to publish $package_name ($current_version → $next_version)"
        
        # Create temporary directory for package
        local temp_package_dir="$TEMP_DIR/$package_name"
        mkdir -p "$temp_package_dir"
        cp -r "$package_dir"/* "$temp_package_dir"/ 2>/dev/null
        
        # Change to temp directory
        cd "$temp_package_dir" || {
            log_message "Failed to change to directory $temp_package_dir" ERROR
            return 1
        }

        # Check if package already exists
        if npm view "$package_name@$next_version" &>/dev/null; then
            log_message "Package $package_name@$next_version already exists, skipping" WARN
            return 0
        }

        # Attempt to publish
        if npm publish --dry-run --access public; then
            log_message "Successfully published $package_name@$next_version" SUCCESS
            ((SUCCESS_COUNT++))
            return 0
        else
            ((retry_count++))
            if [ $retry_count -lt $MAX_RETRIES ]; then
                log_message "Publish failed, retrying in $RETRY_DELAY seconds (Attempt $retry_count of $MAX_RETRIES)" WARN
                sleep "$RETRY_DELAY"
            else
                log_message "Failed to publish $package_name after $MAX_RETRIES attempts" ERROR
                ((ERROR_COUNT++))
                return 1
            fi
        fi
    done
}

# Main execution
main() {
    # Check dependencies
    if ! command -v jq &>/dev/null; then
        log_message "Error: jq is required but not installed" ERROR
        exit 1
    }

    # Create temp directory
    mkdir -p "$TEMP_DIR"

    # Validate inputs
    if [ ! -f "$JSON_FILE" ]; then
        log_message "Error: $JSON_FILE not found. Please run check-publish first." ERROR
        exit 1
    fi

    if ! validate_json; then
        exit 1
    fi

    # Read the number of packages to publish
    TOTAL_PACKAGES=$(jq '.publishablePackages | length' "$JSON_FILE")

    if [ "$TOTAL_PACKAGES" -eq 0 ]; then
        log_message "No packages to publish"
        exit 0
    fi

    log_message "Starting batch publish process for $TOTAL_PACKAGES packages"
    log_message "Configuration: Batch size=$BATCH_SIZE, Delay=$BATCH_DELAY seconds, Max retries=$MAX_RETRIES"

    # Process packages in batches
    for ((i = 0; i < TOTAL_PACKAGES; i += BATCH_SIZE)); do
        BATCH_END=$((i + BATCH_SIZE))
        [ $BATCH_END -gt $TOTAL_PACKAGES ] && BATCH_END=$TOTAL_PACKAGES
        
        log_message "Processing batch $((i/BATCH_SIZE + 1)) (packages $((i+1)) to $BATCH_END of $TOTAL_PACKAGES)"
        
        # Process batch in parallel
        for ((j = i; j < BATCH_END; j++)); do
            {
                PACKAGE_NAME=$(jq -r ".publishablePackages[$j].name" "$JSON_FILE")
                PACKAGE_DIR=$(jq -r ".publishablePackages[$j].directory.relative" "$JSON_FILE")
                CURRENT_VERSION=$(jq -r ".publishablePackages[$j].version.current" "$JSON_FILE")
                NEXT_VERSION=$(jq -r ".publishablePackages[$j].version.next" "$JSON_FILE")
                
                publish_package "$PACKAGE_NAME" "$PACKAGE_DIR" "$CURRENT_VERSION" "$NEXT_VERSION"
            } &
        done
        
        # Wait for all parallel jobs to complete
        wait
        
        # If this isn't the last batch, wait before processing the next batch
        if [ $BATCH_END -lt $TOTAL_PACKAGES ]; then
            log_message "Batch complete. Waiting $BATCH_DELAY seconds before next batch..."
            sleep "$BATCH_DELAY"
        fi
    done

    log_message "Publishing process complete. Successful: $SUCCESS_COUNT, Failed: $ERROR_COUNT"
}

# Run main function
main