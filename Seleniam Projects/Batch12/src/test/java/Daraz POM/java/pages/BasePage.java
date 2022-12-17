package pages;

import java.time.Duration;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static utilities.DriverSetup.getDriver;

public class BasePage {
	
	public WebElement getElemnt(By locator) {
		WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(30));
		return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
	}
	
	public void clickOnElement(By locator) {
		getElemnt(locator).click();
	}
	
	public String getElementText(By locator) {
		return getElemnt(locator).getText();
	}
	
	public void writeText(By locator, String text) {
		getElemnt(locator).sendKeys(text);
		
	}
	
	public String getAlertText() {
		WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(30));
		Alert alert = wait.until(ExpectedConditions.alertIsPresent());
		return alert.getText();
	}

}
