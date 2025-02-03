#!/bin/bash

# Configuration
V_NS='v0xFE wjdlz/WS:'
BATCH_SIZE=10        # Number of packages to publish in each batch
BATCH_DELAY=30      # Delay in seconds between batches
PACKAGE_DELAY=5     # Delay in seconds between individual packages

# Build all packages
echo "$V_NS Building all packages..."
pnpm build:fast

# Ensure we're logged in to npm
echo "$V_NS Checking NPM authentication..."
if ! npm whoami &> /dev/null; then
  echo "$V_NS [ERROR] Not logged in to npm. Please run 'npm login' first."
  exit 1
fi

# Try publishing all at once first
# echo "$V_NS Attempting to publish all packages at once..."
# if changeset --no-git-tag; then
#   echo "$V_NS :) All packages published successfully!"
#   exit 0
# fi

# If that fails, switch to batch publishing
echo "$V_NS Switching to BATCH publishing..."

# Get list of all package directories
packages=()
for pkg in packages/*/; do
  if [ -f "$pkg/package.json" ]; then
    packages+=("$pkg")
  fi
done

total_packages=${#packages[@]}
batch_count=$(( (total_packages + BATCH_SIZE - 1) / BATCH_SIZE ))

echo "$V_NS Found $total_packages packages, publishing in $batch_count batches..."

# Publish in batches
for ((batch=0; batch<batch_count; batch++)); do
  start_idx=$((batch * BATCH_SIZE))
  end_idx=$((start_idx + BATCH_SIZE))
  
  echo "$V_NS [BATCH] $((batch + 1)) of $batch_count..."
  
  # Publish packages in current batch
  for ((i=start_idx; i<end_idx && i<total_packages; i++)); do
    pkg=${packages[$i]}
    echo "$V_NS Publishing $pkg..."
    (cd "$pkg" && npm publish --dry-run --access public)
    
    # Add delay between packages
    if [ $i -lt $((total_packages - 1)) ]; then
      echo "$V_NS [BATCH] Waiting $PACKAGE_DELAY seconds before next package..."
      sleep $PACKAGE_DELAY
    fi
  done
  
  # Add delay between batches
  if [ $batch -lt $((batch_count - 1)) ]; then
    echo "$V_NS [BATCH] $((batch + 1))  Batch complete. Waiting $BATCH_DELAY seconds before next batch..."
    sleep $BATCH_DELAY
  fi
done

echo "$V_NS [BATCH] :) All packages published successfully!"