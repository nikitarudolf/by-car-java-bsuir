package by.bycar.car_service.dto.response;

import lombok.Builder;

@Builder
public record FeatureResponseDTO(
        Long id,
        String name) {
}
