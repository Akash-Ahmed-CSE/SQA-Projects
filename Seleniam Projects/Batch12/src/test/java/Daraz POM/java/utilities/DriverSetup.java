package utilities;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.opera.OperaDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;

import io.github.bonigarcia.wdm.WebDriverManager;

public class DriverSetup {
	private static final ThreadLocal<WebDriver> driver = new ThreadLocal<WebDriver>();
//	private static String browserName = System.getProperty("browser") == null ? "chrome" : System.getProperty("browser");

	@BeforeSuite
	public static synchronized void setBrowser() {
		String browserName = System.getProperty("browser") == null ? "edge" : System.getProperty("browser");
		WebDriver webDriver =getBrowser(browserName);
		webDriver.manage().window().maximize();
		setDriver(webDriver);
	}

	@AfterSuite
	public static synchronized void quitDriver() {
		getDriver().quit();
	}

	public static WebDriver getDriver() {
		return driver.get();

	}

	public static void setDriver(WebDriver driver) {
		DriverSetup.driver.set(driver);
	}
	
	public static WebDriver getBrowser(String browser) {
		switch (browser.toLowerCase()) {
		case "chrome":
			WebDriverManager.chromedriver().setup();
			return new ChromeDriver();
		case "firefox":
			WebDriverManager.firefoxdriver().setup();
			return new FirefoxDriver();
		
		case "opera":
			WebDriverManager.operadriver().setup();
			return new OperaDriver();
		case "edge":
			WebDriverManager.edgedriver().setup();
			return new EdgeDriver();
		default:
			throw  new RuntimeException("Browser not found!!!");
		}
		
		
		
	}
}
