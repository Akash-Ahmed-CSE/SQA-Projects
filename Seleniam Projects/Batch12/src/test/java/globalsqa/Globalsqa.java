package globalsqa;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import io.github.bonigarcia.wdm.WebDriverManager;

public class Globalsqa {
	public static String browser = "chrome";
	public static WebDriver driver; 
	public static void main(String[] args) throws InterruptedException {
		// TODO Auto-generated method stub
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
		driver.get("https://www.globalsqa.com/");
		driver.manage().window().maximize();
		
		JavascriptExecutor js = (JavascriptExecutor)driver;
		js.executeScript("window.scroll(0,700)");
		Thread.sleep(1500);
		
		WebElement Trainings = driver.findElement(By.id("Trainings"));
		Trainings.click();
		
		js.executeScript("window.scroll(0,2900)");
		Thread.sleep(1500);
		
		WebElement slid = driver.findElement(By.xpath("//*[@id=\"post-1397\"]/div[6]/div/div/div[2]/div/div[3]"));
		slid.click();
		Thread.sleep(1500);
		slid.click();
		
		WebElement header = driver.findElement(By.linkText("Even numbers using list comprehension"));
		header.click();
		
		Thread.sleep(3000);
		driver.close(); 
	}
}
