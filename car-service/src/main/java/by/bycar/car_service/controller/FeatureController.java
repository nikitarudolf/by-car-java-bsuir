package by.bycar.car_service.controller;

import by.bycar.car_service.dto.create.FeatureCreateDTO;
import by.bycar.car_service.dto.response.FeatureResponseDTO;
import by.bycar.car_service.service.FeatureService;
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
