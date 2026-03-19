package by.bycar.carservice.dto.response;

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
