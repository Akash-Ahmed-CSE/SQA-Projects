package pages;

import org.openqa.selenium.By;

public class DarazHomePage extends BasePage{
	private By SIGNUPLOGINBUTTON = By.xpath("//a[normalize-space()='Signup / Login']");
	
	
	
	public void clickONLoginButton() {
		clickOnElement(SIGNUPLOGINBUTTON);
	}
	
	
}
