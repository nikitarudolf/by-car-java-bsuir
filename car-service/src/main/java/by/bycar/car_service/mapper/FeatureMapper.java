package by.bycar.car_service.mapper;

import by.bycar.car_service.dto.create.FeatureCreateDTO;
import by.bycar.car_service.dto.response.FeatureResponseDTO;
import by.bycar.car_service.model.Car;
import by.bycar.car_service.model.Feature;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
@RequiredArgsConstructor
public class FeatureMapper {
    public Feature toEntity(FeatureCreateDTO featureCreateDTO) {
        return Feature.builder()
                .name(featureCreateDTO.name())
                .cars(new HashSet<Car>())
                .build();
    }

    public FeatureResponseDTO toDTO(Feature feature) {
        return FeatureResponseDTO.builder()
                .id(feature.getId())
                .name(feature.getName())
                .build();
    }
}
