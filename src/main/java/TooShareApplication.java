/*
 * @Author Zhouqi Gong
 */



import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"controllers"})
public class TooShareApplication {

	public static void main(String[] args) {
		SpringApplication.run(TooShareApplication.class, args);
	}

}
