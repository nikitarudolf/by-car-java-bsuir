package by.bycar.carservice.controller;

import by.bycar.carservice.dto.create.ModelCreateDTO;
import by.bycar.carservice.dto.response.ModelResponseDTO;
import by.bycar.carservice.dto.update.ModelUpdateDTO;
import by.bycar.carservice.service.ModelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/models")
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;

    @PostMapping
    public ModelResponseDTO create(@RequestBody @Valid ModelCreateDTO modelCreateDTO) {
        return modelService.create(modelCreateDTO);
    }

    @GetMapping
    public List<ModelResponseDTO> findAll() {
        return modelService.findAll();
    }

    @PatchMapping("/{id}")
    public ModelResponseDTO update(@PathVariable Long id, @RequestBody @Valid ModelUpdateDTO modelUpdateDTO) {
        return modelService.update(id, modelUpdateDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteByid(@PathVariable Long id) {
        modelService.deleteById(id);
    }
}
