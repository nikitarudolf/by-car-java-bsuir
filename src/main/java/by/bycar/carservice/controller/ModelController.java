package by.bycar.carservice.controller;

import by.bycar.carservice.dto.create.ModelCreateDTO;
import by.bycar.carservice.dto.response.ModelResponseDTO;
import by.bycar.carservice.service.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
