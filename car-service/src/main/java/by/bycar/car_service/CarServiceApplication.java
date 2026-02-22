package by.bycar.car_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CarServiceApplication {
    protected CarServiceApplication() {
    }
    public static void main(String[] args) {
        SpringApplication.run(CarServiceApplication.class, args);
    }

}
