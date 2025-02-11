import requests
from bs4 import BeautifulSoup
import time
import pandas as pd
import json
from tqdm import tqdm
from collections import OrderedDict

BASE_URL = "https://studentorg.ucsd.edu"  # Complete URL

def get_club_links(url):
    """
    Retrieve club links from the page.
    """
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    clubs = soup.select("tbody a")
    # Build a dictionary: club name -> complete URL
    club_links = {
        club.text.strip(): BASE_URL + club["href"]
        for club in clubs if "href" in club.attrs
    }
    return club_links

def get_club_details(name, url):
    """
    Scrape details for a single club.
    """
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    
    details = {}
    category, status, _  = soup.select(".main-section-content h4")
    academic_year, purpose, created, _, organization_type, organization_email, social_media, fund_manager = soup.select(".main-section-content dd")

    details["name"] = name
    details["Category"] = category.text.strip()
    details["Status"] = status.text.strip()
    details["Academic Year"] = academic_year.text.strip()
    details["Purpose"] = purpose.text.strip()
    details["Created"] = created.text.strip()
    details["Organization Type"] = organization_type.text.strip()
    details["Organization Email"] = organization_email.text.strip()
    details["Social Media"] = social_media.text.strip()
    details["Fund Manager"] = fund_manager.text.strip()
    
    return details

def main():
    # Get all club links
    club_links = get_club_links(BASE_URL)
    print("Successfully get all club links.")
    
    # Print club names and their URLs
    # for name, link in club_links.items():
    #     print(f"{name} : {link}")
    
    # Scrape details for each club
    all_club_details = []
    for name, link in tqdm(club_links.items(), desc="Scraping club details"):
        # print(f"Scraping {name}...")
        details = get_club_details(name, link)
        all_club_details.append(details)
        # time.sleep(1)  # Prevent rapid requests
    
    # Print first 5 club details
    for club in all_club_details[:5]:
        print(club)
    
    # Save the data to a CSV file
    with open("ucsd_clubs.json", "w", encoding="utf-8") as f:
        json.dump(all_club_details, f, ensure_ascii=False, indent=4)
    print("Data saved to ucsd_clubs.json")

if __name__ == "__main__":
    main()
