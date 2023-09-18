import os
from tqdm import tqdm
import time
import pandas as pd

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException

if __name__ == '__main__':
    # Input Facebook email and password
    fb_email = input("Enter Facebook email or phone number: ")
    fb_pass  = input('Enter Password: ')

    # Dates for Spotify charts
    start_date_str = '2017-01-01'
    end_date_str = '2022-12-31'

    # Generate a range of dates using pandas date_range() function
    dates = pd.date_range(start=start_date_str, end=end_date_str).strftime('%Y-%m-%d').tolist()


    # Create a ChromeOptions object and specify the download directory
    options = webdriver.ChromeOptions()

    # Get the current user's home directory and construct the universal directory path
    user = os.path.expanduser("~")
    directory_path = os.path.join(user, "OneDrive", "Documents", "GitHub", "Covid-Spotify", "data", "spotify")
    
    if not os.path.exists(directory_path):
        os.makedirs(directory_path)
    prefs = {"download.default_directory": directory_path}
    options.add_experimental_option("prefs", prefs)

    # Instantiate the Chrome web driver
    driver = webdriver.Chrome(chrome_options=options)

    # Navigate to the webpage
    driver.get("https://accounts.spotify.com/en/login?continue=https%3A%2F%2Fcharts.spotify.com/login")

    # Find the "Continue with Facebook" button element by its data-testid attribute
    redirect_fb_login_button = driver.find_element(By.CSS_SELECTOR, '[data-testid="facebook-login"]')
    redirect_fb_login_button.click()

    email_field = driver.find_element(By.ID, "email")
    pass_field = driver.find_element(By.ID, "pass")
    email_field.send_keys(fb_email)
    pass_field.send_keys(fb_pass)

    fb_login_button = driver.find_element(By.ID, 'loginbutton')
    fb_login_button.click()

    wait = WebDriverWait(driver, 2)
    body_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'body[data-qa="spotify-charts-website"]')))

    for date in tqdm(dates):
        if os.path.exists(f'data/spotify/regional-us-daily-{date}.csv'):
            continue
        
        driver.get(f'https://charts.spotify.com/charts/view/regional-us-daily/{date}')

        try:
            chart_exists = wait.until(EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), \"Couldn't find this chart\")]")))
        except TimeoutException:
            chart_exists = False

        if chart_exists:
            continue

        # Find the "Download CSV" button element by its aria-labelledby attribute
        download_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[aria-labelledby="csv_download"]')))

        # Click the button
        download_button.click()

        time.sleep(1.25)
