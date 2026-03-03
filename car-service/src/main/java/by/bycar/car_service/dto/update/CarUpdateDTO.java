package by.bycar.car_service.dto.update;

import lombok.Builder;

import java.util.List;

@Builder
public record CarUpdateDTO(
        Integer year,
        Integer mileage,
        String vin,
        Long modelId,
        List<Long> featureIds
) {}
