#!/bin/bash

while read -r url; do
  filename=$(basename "$url")
  curl -O "$url" -o "flags/$filename"
done < flag_urls.txt