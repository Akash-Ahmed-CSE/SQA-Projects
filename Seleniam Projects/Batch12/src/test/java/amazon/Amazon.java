package amazon;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import io.github.bonigarcia.wdm.WebDriverManager;

public class Amazon {
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
		driver.get("https://www.amazon.com/");
		driver.manage().window().maximize();
		
		WebElement Signin = driver.findElement(By.id("nav-link-accountList-nav-line-1"));
		Signin.click();
		WebElement Email = driver.findElement(By.id("ap_email"));
		Email.sendKeys("akash.test.sqa@gmail.com");
		
		WebElement con = driver.findElement(By.id("continue"));
		con.click();
	
		WebElement Password = driver.findElement(By.id("ap_password"));
		Password.sendKeys("Test123#");
		Thread.sleep(1500);
		
		WebElement checkbox = driver.findElement(By.xpath("//*[@id=\"authportal-main-section\"]/div[2]/div/div/div/form/div/div[2]/div/div/label/div/label/input"));
		checkbox.click();
		Thread.sleep(1500);
		
		WebElement sub = driver.findElement(By.id("signInSubmit"));
		sub.click();
		
		WebElement Search = driver.findElement(By.id("twotabsearchtextbox"));
		Search.sendKeys("Iphone x");
		Search.submit();
		WebElement linkElement = driver.findElement(By.linkText("Apple iPhone X, 64GB, Space Gray - Fully Unlocked (Renewed Premium)"));
		linkElement.click();
		Thread.sleep(1000);
		
		JavascriptExecutor js = (JavascriptExecutor)driver;
		js.executeScript("window.scroll(0,200)");
		
		WebElement quantity = driver.findElement(By.xpath("//*[@id=\"a-autoid-0-announce\"]"));
		quantity.click();
		WebElement quantity2 = driver.findElement(By.xpath("(//a[normalize-space()='2'])[1]"));
		quantity2.click();
		
		WebElement AddToCart = driver.findElement(By.xpath("//*[@id=\"add-to-cart-button\"]"));
		AddToCart.click();
		
		Thread.sleep(3000);
		WebElement close = driver.findElement(By.xpath("//*[@id=\"attach-close_sideSheet-link\"]"));
		close.click();
	
		WebElement Hamm = driver.findElement(By.xpath("//*[@id=\"nav-hamburger-menu\"]/span"));
		Hamm.click();
		
		WebElement signout = driver.findElement(By.xpath("//*[@id=\"hmenu-content\"]/ul[1]/li[25]/a"));
		js.executeScript("window.scroll(0,2000)");
		signout.click();
		
			
		Thread.sleep(3000);
		driver.close(); 
	}
}
