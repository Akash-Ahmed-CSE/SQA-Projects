package youtube_code;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import static org.openqa.selenium.support.locators.RelativeLocator.with;
import io.github.bonigarcia.wdm.WebDriverManager;

public class What_is_Relative_Locator13 {
	public static String browser = "chrome";
	public static WebDriver driver; 
	public static void main(String[] args) throws InterruptedException {
	
		if(browser.equals("Firefox")) {
			WebDriverManager.firefoxdriver().setup();
			driver = new FirefoxDriver();
		}
		else if(browser.equals("chrome")) {
			WebDriverManager.chromedriver().setup();
			driver = new ChromeDriver();
		} else if (browser.equals("edge")) {
			WebDriverManager.edgedriver().setup();
			driver = new EdgeDriver();
		}
		driver.get("https://www.saucedemo.com");
		WebElement password = driver.findElement(By.id("password"));
		driver.findElement(with(By.tagName("input")).above(password)).sendKeys("test text");
		Thread.sleep(3000);
		driver.close(); 
	}
}
