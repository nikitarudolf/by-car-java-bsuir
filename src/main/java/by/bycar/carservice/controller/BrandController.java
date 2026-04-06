package by.bycar.carservice.controller;

import by.bycar.carservice.dto.create.BrandCreateDTO;
import by.bycar.carservice.dto.response.BrandResponseDTO;
import by.bycar.carservice.dto.update.BrandUpdateDTO;
import by.bycar.carservice.service.BrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;

    @PostMapping
    public BrandResponseDTO create(@RequestBody @Valid BrandCreateDTO brandCreateDTO) {
        return brandService.create(brandCreateDTO);
    }

    @PatchMapping("/{id}")
    public BrandResponseDTO update(@PathVariable Long id, @RequestBody @Valid BrandUpdateDTO brandUpdateDTO) {
        return brandService.update(id, brandUpdateDTO);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        brandService.deleteById(id);
    }

    @GetMapping
    public List<BrandResponseDTO> findAll() {
        return brandService.findALl();
    }
}
