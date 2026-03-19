package by.bycar.carservice.dto.update;

import lombok.Builder;

import java.util.List;

@Builder
public record AdvertisementUpdateDTO(
        String description,
        Double price,
        Long modelId,
        Integer year,
        Integer mileage,
        String vin,
        List<Long> featureIds) {
}
