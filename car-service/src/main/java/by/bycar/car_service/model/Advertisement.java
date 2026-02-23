package by.bycar.car_service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Advertisement {
    private Long id;
    private String brand;
    private String model;
    private int year;
    private Double price;
}