package by.bycar.carservice.mapper;

import by.bycar.carservice.dto.create.FeatureCreateDTO;
import by.bycar.carservice.dto.response.FeatureResponseDTO;
import by.bycar.carservice.model.Feature;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
@RequiredArgsConstructor
public class FeatureMapper {
    public Feature toEntity(FeatureCreateDTO featureCreateDTO) {
        return Feature.builder()
                .name(featureCreateDTO.name())
                .cars(new HashSet<>())
                .build();
    }

    public FeatureResponseDTO toDTO(Feature feature) {
        return FeatureResponseDTO.builder()
                .id(feature.getId())
                .name(feature.getName())
                .build();
    }
}
