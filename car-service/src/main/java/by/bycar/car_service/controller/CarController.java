package by.bycar.car_service.controller;

import by.bycar.car_service.dto.response.CarResponseDTO;
import by.bycar.car_service.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {
    private final CarService carService;

    @GetMapping
    public List<CarResponseDTO> findAll() {
        return carService.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteByid(@PathVariable Long id) {
        carService.deleteById(id);
    }
}
