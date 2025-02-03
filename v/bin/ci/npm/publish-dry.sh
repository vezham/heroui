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
