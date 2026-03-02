package by.bycar.car_service.dto.response;

import lombok.Builder;

@Builder
public record AdvertisementResponseDTO(
        Long id,
        String description,
        Double price,
        String sellerName,
        String sellerPhone,
        CarResponseDTO car) {
}
