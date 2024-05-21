import os
import pycountry
import requests

# Create a directory to store the flags
flags_dir = "flags"
if not os.path.exists(flags_dir):
    os.makedirs(flags_dir)

for country in pycountry.countries:
    country_code = country.alpha_2
    country_name = country.name
    flag_url = country.flag_url

    try:
        response = requests.get(flag_url)
        response.raise_for_status()  # Raise an exception for non-2xx status codes

        # Save the flag image
        flag_path = os.path.join(flags_dir, f"{country_code}.png")
        with open(flag_path, "wb") as f:
            f.write(response.content)
        print(f"Downloaded flag for {country_name} ({country_code})")

    except requests.exceptions.RequestException as e:
        print(f"Error downloading flag for {country_name} ({country_code}): {e}")

print("Done!")