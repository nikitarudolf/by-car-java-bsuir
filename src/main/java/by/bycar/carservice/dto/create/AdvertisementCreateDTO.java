package by.bycar.carservice.dto.create;

import java.util.List;

public record AdvertisementCreateDTO(
        String description,
        Double price,
        Long userId,
        Long modelId,
        Integer year,
        Integer mileage,
        String vin,
        List<Long> featureIds) {
}
