#!/bin/bash

# Create a directory to store the flags
mkdir -p flags

# Fetch the list of country codes and names
country_list=$(curl -s 'https://restcountries.com/v3.1/all' | jq -r '.[] | "\(.cca2) \(.name.common)"')

# Iterate over the country list and download the flags
while read -r country_code country_name; do
    flag_url=$(curl -s "https://restcountries.com/v3.1/alpha/$country_code" | jq -r '.flags.png')

    if [ -n "$flag_url" ]; then
        flag_path="flags/$country_code.png"
        curl -s "$flag_url" -o "$flag_path"
        echo "Downloaded flag for $country_name ($country_code)"
    else
        echo "Error: Failed to fetch flag URL for $country_name ($country_code)"
    fi
done <<< "$country_list"

echo "Done!"