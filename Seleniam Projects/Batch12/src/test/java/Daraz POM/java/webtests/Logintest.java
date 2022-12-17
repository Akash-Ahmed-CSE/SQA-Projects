package webtests;

import org.testng.annotations.Test;

import pages.DarazHomePage;
import pages.DarazLoginPage;
import utilities.DriverSetup;

public class Logintest extends DriverSetup{
	DarazHomePage darazHomePage = new DarazHomePage();
	DarazLoginPage darazLoginPage = new DarazLoginPage();
	
	@Test
	public void loginTest() {
		getDriver().get("https://www.daraz.com.bd/");
		darazHomePage.clickONLoginButton();
//		darazLoginPage.enterUsername("01828695933");
//		darazLoginPage.enterPassword("Password");
		darazLoginPage.doLogIn("01828695933", "Password");
		darazLoginPage.cliONLoginButton();
//		assertEquals(darazLoginPage.getAlertText(), "Incorrect username or password.");
	}

}
