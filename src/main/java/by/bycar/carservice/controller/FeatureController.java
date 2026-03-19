package by.bycar.carservice.controller;

import by.bycar.carservice.dto.create.FeatureCreateDTO;
import by.bycar.carservice.dto.response.FeatureResponseDTO;
import by.bycar.carservice.service.FeatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feature")
@RequiredArgsConstructor
public class FeatureController {
    private final FeatureService featureService;

    @PostMapping
    public FeatureResponseDTO create(@RequestBody FeatureCreateDTO featureCreateDTO) {
        return featureService.create(featureCreateDTO);
    }

    @GetMapping
    public List<FeatureResponseDTO> findAll() {
        return featureService.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        featureService.deleteById(id);
    }
}
