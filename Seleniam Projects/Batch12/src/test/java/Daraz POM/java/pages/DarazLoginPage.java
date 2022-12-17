package pages;

import org.openqa.selenium.By;

public class DarazLoginPage extends BasePage{
	private By USERNAME = By.xpath("//input[@placeholder='Please enter your Phone Number or Email']");
	private By PASSWORD = By.xpath("//input[@placeholder='Please enter your password']");
	private By LOGINBUTTON = By.xpath("//button[normalize-space()='LOGIN']");
	
	
	public void enterUsername(String username) {
		writeText(USERNAME, username);
	}
	
	public void enterPassword(String password) {
		writeText(PASSWORD, password);
	}
	
	public void cliONLoginButton() {
		clickOnElement(LOGINBUTTON);
	}
	
	public void doLogIn(String username, String password) {
		writeText(USERNAME, username);
		writeText(PASSWORD, password);
		clickOnElement(LOGINBUTTON);
	}
	
	
}
