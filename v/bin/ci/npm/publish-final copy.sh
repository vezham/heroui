#!/bin/bash

# Configuration
V_NS='wjdlz/WS'
BATCH_SIZE=20   # Number of packages to publish in each batch
BATCH_DELAY=10   #[300] # Delay between batches in seconds (5 minutes)
PACKAGE_DELAY=0 # Delay between individual packages in seconds 
JSON_FILE=".vezham/publish-check-result.json"
LOG_FILE=".vezham/log-publish-$(date '+%Y-%m-%d %H:%M:%S').txt"

# pre-setup
mkdir .vezham
node v/bin/ci/npm/scripts/check-publish.js # pnpm v:g:check-publish

# Function to log messages with timestamp
log_message() {
    echo "[vezham] [$(date '+%Y-%m-%d %H:%M:%S')] $V_NS: $1" | tee -a "$LOG_FILE"
}

# Build all packages
log_message "[INFO] Building all packages..."
pnpm build:fast

# --------- END of pre-setup

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    log_message "[Error] jq is required but not installed. Please install jq first."
    exit 1
fi

# Check if JSON file exists
if [ ! -f "$JSON_FILE" ]; then
    log_message "[Error] $JSON_FILE not found. Please run check-publish first."
    exit 1
fi

# Read the number of packages to publish
TOTAL_PACKAGES=$(jq '.publishablePackages | length' "$JSON_FILE")

if [ "$TOTAL_PACKAGES" -eq 0 ]; then
    log_message "No packages to publish."
    exit 0
fi

# Ensure we're logged in to npm
log_message "[INFO] Checking NPM authentication..."
if ! npm whoami &> /dev/null; then
  log_message "[ERROR] Not logged in to npm. Please run 'npm login' first."
  exit 1
fi

# # Try publishing all at once first
# log_message "[INFO] Attempting to publish all packages at once..."
# if changeset --dry-run --no-git-tag; then
#   log_message "[INFO] :) All packages published successfully!"
#   exit 0
# fi

# --------- [BATCH] 
# If that fails, switch to batch publishing
BATCH_COUNT=$(( (TOTAL_PACKAGES + BATCH_SIZE - 1) / BATCH_SIZE ))

log_message "Switching to BATCH publishing..."
log_message "[INFO] Found $TOTAL_PACKAGES packages, publishing in $BATCH_COUNT batches..."
log_message "[BATCH] size: $BATCH_SIZE, Delay between batches: $BATCH_DELAY & packages: $PACKAGE_DELAY in seconds"

# Process packages in batches
BATCH_NUMBER=1
for ((i = 0; i < TOTAL_PACKAGES; i += BATCH_SIZE)); do
    BATCH_END=$((i + BATCH_SIZE))
    if [ $BATCH_END -gt $TOTAL_PACKAGES ]; then
        BATCH_END=$TOTAL_PACKAGES
    fi
    
    log_message "[INFO] Processing batch $BATCH_NUMBER of $BATCH_COUNT (packages $((i+1)) to $BATCH_END of $TOTAL_PACKAGES)"
    
    # Process each package in the current batch
    for ((j = i; j < BATCH_END; j++)); do
        PACKAGE_NAME=$(jq -r ".publishablePackages[$j].name" "$JSON_FILE")
        PACKAGE_DIR=$(jq -r ".publishablePackages[$j].directory.relative" "$JSON_FILE")
        CURRENT_VERSION=$(jq -r ".publishablePackages[$j].version.current" "$JSON_FILE")
        NEXT_VERSION=$(jq -r ".publishablePackages[$j].version.next" "$JSON_FILE")
        
        log_message "Publishing $PACKAGE_NAME ($CURRENT_VERSION → $NEXT_VERSION)"
        
        # Change to package directory
        cd "$PACKAGE_DIR" || {
            log_message "[ERROR] Failed to change to directory $PACKAGE_DIR"
            continue
        }
        
        # Attempt to publish the package
        if npm publish --dry-run --access public; then
            log_message "[INFO] Successfully published $PACKAGE_NAME@$NEXT_VERSION"
        else
            log_message "[ERROR] Failed to publish $PACKAGE_NAME"
        fi
        
        # Return to root directory
        cd - > /dev/null

        # Add delay between packages
        if [ $j -lt $((BATCH_END - 1)) ]; then
            log_message "[BATCH] Waiting $PACKAGE_DELAY seconds before next package..."
            sleep $PACKAGE_DELAY
        fi
    done
    
    # If this isn't the last batch, wait before processing the next batch
    if [ $BATCH_END -lt $TOTAL_PACKAGES ]; then
        log_message "[BATCH] Batch $BATCH_NUMBER completed. Waiting $BATCH_DELAY seconds before next batch..."
        sleep "$BATCH_DELAY"
    fi
    
    BATCH_NUMBER=$((BATCH_NUMBER + 1))
done

log_message "[BATCH] :) All packages published successfully!"
log_message "Publishing process complete. Check $LOG_FILE for details."
