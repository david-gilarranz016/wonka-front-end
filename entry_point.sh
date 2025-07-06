#!/bin/sh
# ========================================================================
# Dinamically replace environment variables in the source code with their
# appropriate value
# ========================================================================

# Set the exit flag if any command fails
set -e

echo "Setting environment Variables..."

# Iterate through environment variables starting with "APP_"
env | grep "APP_" | while IFS='=' read -r key value; do
  # Display the variable being changed
  echo " -> Replacing ${key} with ${value}"

  # Use find and sed to replace the variable with its value
  find '/app' -type f -exec sed -i "s|${key}|${value}|g" {} \;
done

echo "...Done"

# Run the application
cd /app && http-server dist
