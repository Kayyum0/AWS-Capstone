import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def verify_doctor_dashboard_v2():
    chrome_options = Options()
    # chrome_options.add_argument("--headless") # Comment out to see the browser
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        print("1. Logging in as Doctor...")
        driver.get('http://[::1]:5173')
        # Simulate Doctor Login via localStorage
        driver.execute_script("localStorage.setItem('doctorUser', JSON.stringify({id: 'doctor-id-1', full_name: 'Smith', role: 'doctor'}));")
        driver.get('http://[::1]:5173/doctor/dashboard')
        
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//h1[contains(., 'Doctor Dashboard')]")))
        print("   - Accessed Doctor Dashboard: OK")

        print("\n2. Verifying Stats Section...")
        stats_text = driver.find_element(By.TAG_NAME, "body").text
        assert "Total Patients" in stats_text, "Total Patients stat missing"
        assert "Upcoming Appointments" in stats_text, "Upcoming Appointments stat missing"
        print("   - Stats displayed: OK")

        print("\n3. Verifying Tabs...")
        appointments_tab = driver.find_element(By.XPATH, "//button[contains(., 'Appointments')]")
        patients_tab = driver.find_element(By.XPATH, "//button[contains(., 'Patient Database')]")
        assert appointments_tab.is_displayed(), "Appointments tab missing"
        assert patients_tab.is_displayed(), "Patient Database tab missing"
        print("   - Tabs present: OK")

        print("\n4. Verifying Patient Search...")
        patients_tab.click()
        search_input = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder*='Search']")))
        assert search_input.is_displayed(), "Search input missing"
        print("   - Search input present: OK")
        
        print("\n5. Verifying Clean Header (No duplicate logout)...")
        # Check that ONLY the profile dropdown exists for logout, not a loose button in header
        # The profile logout is inside the dropdown, which is hidden by default.
        # We check that there isn't a visible "Logout" button in the immediate header row like before.
        # The new header has "Welcome back..." p tag.
        header_text = driver.find_element(By.TAG_NAME, "header").text
        assert "Logout" not in header_text.replace("Sign out", ""), "Duplicate Logout button might still be visible in header (outside dropdown)"
        print("   - No duplicate logout in header: OK")

        print("\nSUCCESS: Doctor Dashboard V2 verified!")

    except Exception as e:
        print(f"\nFAILURE: {str(e)}")
        # print(driver.page_source)
    finally:
        driver.quit()

if __name__ == "__main__":
    time.sleep(2) # Wait for server update
    verify_doctor_dashboard_v2()
