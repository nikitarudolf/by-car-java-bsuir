package by.bycar.car_service.controller;

import by.bycar.car_service.dto.create.BrandCreateDTO;
import by.bycar.car_service.dto.response.BrandResponseDTO;
import by.bycar.car_service.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;

    @PostMapping
    public BrandResponseDTO create(@RequestBody BrandCreateDTO brandCreateDTO) {
        return brandService.create(brandCreateDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        brandService.deleteById(id);
    }

    @GetMapping
    public List<BrandResponseDTO> findAll() {
        return brandService.findALl();
    }
}
