package locaor_learning;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class MyFistLocatorTest {
	@Test
	public void myFirstTest() throws InterruptedException {
		WebDriverManager.chromedriver().setup();
		// create a chromeDriver object named driver.
		WebDriver driver = new ChromeDriver();

		// go to google web page
		driver.get("https://rahulshettyacademy.com/AutomationPractice/");
		// Maximize the browser window
		driver.manage().window().maximize();

		// wait for 5 seconds
		
		WebElement header = driver.findElement(By.tagName("h1"));
		String S = header.getText();
		System.out.println("text is: "+S);
		
		WebElement checkboc1 = driver.findElement(By.id("checkBoxOption1"));
		
		checkboc1.click();
		 
		WebElement tab = driver.findElement(By.className("switch-tab"));
		System.out.println("tab text: "+tab.getText());
		
		WebElement linkElement = driver.findElement(By.linkText("Free Access to InterviewQues/ResumeAssistance/Material"));
		
		System.out.println("Tag element Name: "+ linkElement.getTagName() );
		
		WebElement PartiallinkElement = driver.findElement(By.partialLinkText("Free Access to InterviewQues/ResumeAssistance"));
		
		System.out.println("Partial link: "+ PartiallinkElement.getTagName() );
		
		WebElement inputtextElement = driver.findElement(By.xpath("//input[@id='autocomplete']"));
		inputtextElement.sendKeys("Test Text");
		
		WebElement inputtextElementCSS = driver.findElement(By.cssSelector("input[name='enter-name']"));
		inputtextElementCSS.sendKeys("Test Text");
		
		WebElement inputtextElementDropdown = driver.findElement(By.cssSelector("select[name='dropdown-class-example']"));
		inputtextElementDropdown.click();
		WebElement inputtextElementDropdown2 = driver.findElement(By.xpath("//option[@value='option2']"));
		inputtextElementDropdown2.click();
		
		Thread.sleep(3000);
		// close the browser all active window
		driver.quit();
	}
}
