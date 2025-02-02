#!/bin/bash

# Path to the .cursor-updates file (update this with your project's path)
CURSOR_FILE="${CURSOR_UPDATES_FILE:-./.cursor-updates}"

# Check if a path is provided as a command-line argument
if [ $# -gt 0 ]; then
  CURSOR_FILE="$1"
fi

# Get today's date in YYYY-MM-DD format
TODAY=$(date +%Y-%m-%d)

# Create a temporary file
TMP_FILE=$(mktemp)

# Write the new date line
echo "## ${TODAY}" > "$TMP_FILE"

# Append the rest of the file starting from line 4 (skipping the header and old date)
tail -n +4 "$CURSOR_FILE" >> "$TMP_FILE"

# Add the header back with today's date
(
  echo "# Cursor Updates"
  echo ""
  echo "This file tracks significant changes made to the codebase through Cursor agent interactions. Today's date is: ${TODAY}"
  cat "$TMP_FILE"
) > "$CURSOR_FILE"

# Clean up
rm "$TMP_FILE"

# Check if we are in a Git repository
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  # Ask if the user wants to commit the change
  read -r -p "Commit the update to .cursor-updates? [y/N] " response
  if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    git add "$CURSOR_FILE"
    git commit -m "Update .cursor-updates"
  fi
fi

echo ".cursor-updates file updated."
