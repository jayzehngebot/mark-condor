#!/bin/bash
for img in ./*.{jpg,jpeg,png}; do
    # Get the filename without extension
    filename=$(basename "$img" | sed 's/\.[^.]*$//')
    # Convert image to WebP and save it in the output directory
    cwebp "$img" -o ./"$filename".webp
done