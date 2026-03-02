package by.bycar.car_service.mapper;

import by.bycar.car_service.dto.response.CarResponseDTO;
import by.bycar.car_service.model.Car;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class CarMapper {
    private final ModelMapper modelMapper;
    private final FeatureMapper featureMapper;

    public CarResponseDTO toDTO(Car car) {
        return CarResponseDTO.builder()
                .id(car.getId())
                .year(car.getYear())
                .mileage(car.getMileage())
                .vin(car.getVin())
                .model(modelMapper.toDTO(car.getModel()))
                .features(car.getFeatures().stream()
                        .map(featureMapper::toDTO)
                        .toList()).build();
    }
}
