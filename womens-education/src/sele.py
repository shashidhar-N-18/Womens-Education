from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Configuration
driver_path = "C:/Users/Asus/WEB_TEK college/chromedriver-win64/chromedriver-win64/chromedriver.exe"  # Path to ChromeDriver
chrome_binary_path = "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"  # Path to Chrome Binary
base_url = "http://localhost:5173/"  # Replace with your website's URL

# Set Chrome options
chrome_options = Options()
chrome_options.binary_location = chrome_binary_path

# Initialize the Service object for ChromeDriver
service = Service(driver_path)

# Initialize WebDriver with options
driver = webdriver.Chrome(service=service, options=chrome_options)

# WebDriverWait to handle waits
wait = WebDriverWait(driver, 10)  # Timeout for waiting elements (10 seconds)

try:
    # Step 1: Open the home page
    driver.get(base_url)
    driver.maximize_window()
    print("Opened the website.")

    # Verify the header text on the home page
    header_text = wait.until(EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Empowering Women Through Education')]")))
    assert header_text.is_displayed(), "Header text 'Empowering Women Through Education' not found."
    print("Verified: Home page loaded with header text.")

    # Step 2: Test navigation to Categories Videos (click on Get Started button)
    go_to_videos_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Get Started']")))
    go_to_videos_btn.click()
    print("Clicked on 'Get Started' button to navigate to Categories Videos.")
    time.sleep(2)

    # Verify if the "Learn Skills Through Videos" section has loaded
    learn_skills_header = wait.until(EC.presence_of_element_located((By.XPATH, "//h2[text()='Learn Skills Through Videos']")))
    assert learn_skills_header.is_displayed(), "Categories page not loaded."
    print("Verified: 'Learn Skills Through Videos' section loaded.")

    # Step 3: Test clicking on 'Language Skills'
    language_skills_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Go to Videos']")))
    language_skills_btn.click()
    print("Clicked on 'Go to Videos' button to navigate to Language Skills.")
    time.sleep(2)
    assert "Learn New Skills Through Videos" in driver.page_source, "Language Skills page not loaded."
    print("Verified: 'Language Skills' page loaded.")

    # Step 4: Navigate to the language courses section
    language_skills_btn = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//button[contains(text(), 'Learn Through Videos')]")
        )
    )
    language_skills_btn.click()
    print("Clicked on 'Learn Through Videos' button to navigate to Language Courses.")
    time.sleep(2)
    assert "Learning With Videos" in driver.page_source, "Learning With Videos not loaded."
    print("Verified: 'Learning With Videos' page loaded.")

    # Step 5: Test 'Industrial Skills'
    industrial_skills_btn = wait.until(
        EC.element_to_be_clickable((By.ID, "english-course-btn"))
    )
    industrial_skills_btn.click()
    print("Clicked on 'English Course in Kannada' button to navigate to Industrial Skills.")
    time.sleep(2)
    
    driver.back()
    print("Navigated back to the previous page.")
    time.sleep(1)

    print("All tests passed successfully!")

finally:
    # Close the browser
    driver.quit()
    print("Browser closed.")
