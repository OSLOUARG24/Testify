package com.oslo.testify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan("com.oslo.testify")
@EnableJpaRepositories("com.oslo.testify.repository")
@EntityScan("com.oslo.testify")
public class TestifyApp {

  public static void main(String[] args) {
    SpringApplication.run(TestifyApp.class, args);
  }
}
