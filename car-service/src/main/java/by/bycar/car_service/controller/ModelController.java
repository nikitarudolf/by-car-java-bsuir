package by.bycar.car_service.controller;

import by.bycar.car_service.dto.create.ModelCreateDTO;
import by.bycar.car_service.dto.response.ModelResponseDTO;
import by.bycar.car_service.service.ModelService;
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
@RequestMapping("/api/models")
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;

    @PostMapping
    public ModelResponseDTO create(@RequestBody ModelCreateDTO modelCreateDTO) {
        return modelService.create(modelCreateDTO);
    }

    @GetMapping
    public List<ModelResponseDTO> findAll() {
        return modelService.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteByid(@PathVariable Long id) {
        modelService.deleteById(id);
    }
}
