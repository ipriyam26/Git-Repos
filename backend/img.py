from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# create a new chrome browser instance
browser = webdriver.Chrome("/Users/ipriyam26/Downloads/chromedriver")

# navigate to the website
browser.get("https://www.vecteezy.com/free-vector/technology")

# wait for the page to load
wait = WebDriverWait(browser, 10)
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".item")))

# get all the image elements
img_elements = browser.find_elements_by_css_selector(".item img")

# extract the src attribute from each image element
img_urls = [img.get_attribute("src") for img in img_elements]

# print the URLs
for url in img_urls:
    print(url)

# close the browser
browser.quit()

