import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def verify_header():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)
    
    try:
        print("1. Verifying Guest Header...")
        driver.get('http://[::1]:5173')
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.LINK_TEXT, "User Login")))
        
        # Verify Guest Links
        assert len(driver.find_elements(By.LINK_TEXT, "Services")) > 0, "Guest should see Services"
        print("   - Guest links present: OK")

        print("\n2. Verifying Doctor Header...")
        driver.execute_script("localStorage.setItem('doctorUser', JSON.stringify({name: 'Strange', role: 'doctor'}));")
        driver.refresh()
        
        greeting = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Hello, Dr. Strange')]")))
        print(f"   - Greeting found: '{greeting.text}'")
        
        # Verify Strict Navigation
        assert len(driver.find_elements(By.LINK_TEXT, "Dashboard")) > 0, "Doctor must see Dashboard"
        assert len(driver.find_elements(By.LINK_TEXT, "Services")) == 0, "Doctor should NOT see Services"
        assert len(driver.find_elements(By.LINK_TEXT, "Medical History")) == 0, "Doctor should NOT see Medical History"
        print("   - Doctor navigation strictness: OK")
        
        # Verify Dropdown Toggle
        greeting.click()
        logout_btn = WebDriverWait(driver, 2).until(EC.visibility_of_element_located((By.XPATH, "//button[contains(., 'Sign out')]")))
        print("   - Dropdown toggled on click: OK")

        print("\n3. Verifying Patient Header...")
        driver.execute_script("localStorage.removeItem('doctorUser');")
        driver.execute_script("localStorage.setItem('user', JSON.stringify({name: 'John Doe', role: 'patient'}));")
        driver.refresh()
        
        greeting = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Hello, John Doe')]")))
        print(f"   - Greeting found: '{greeting.text}'")
        
        # Verify Strict Navigation
        assert len(driver.find_elements(By.LINK_TEXT, "Medical History")) > 0, "Patient must see Medical History"
        assert len(driver.find_elements(By.LINK_TEXT, "Book Appointment")) > 0, "Patient must see Book Appointment"
        assert len(driver.find_elements(By.LINK_TEXT, "Services")) == 0, "Patient should NOT see Services"
        print("   - Patient navigation strictness: OK")
        
        print("\n4. Verifying Logout...")
        # Open dropdown and click logout
        greeting.click()
        logout_btn = WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Sign out')]")))
        logout_btn.click()
        
        login_link = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.LINK_TEXT, "User Login")))
        print("   - Returned to guest state: OK")

        print("\nSUCCESS: Header verification complete.")

    except Exception as e:
        print(f"\nFAILURE: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    verify_header()
