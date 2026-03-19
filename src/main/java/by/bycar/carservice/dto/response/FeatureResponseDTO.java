package by.bycar.carservice.dto.response;

import lombok.Builder;

@Builder
public record FeatureResponseDTO(
        Long id,
        String name) {
}
