package com.knowit.erozgaar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@ComponentScan(basePackages = "com.knowit.erozgaar.*")
public class ErozgaarApplication {
	public static void main(String[] args) {
		SpringApplication.run(ErozgaarApplication.class, args);
	}
}
