#!/bin/bash

# Command to execute
command="$1"
filepath="$2"
log_file_path="$3"

# Create log file if it doesn't exist
touch "$log_file_path"

# Set permissions of the log file
chmod 666 "$log_file_path"

echo "Log file path: $log_file_path"

# Execute the keploy record command, redirecting output to the log file
/usr/local/bin/keploybin record -c "$command" "$filepath" >> "$log_file_path" 2>&1 &
