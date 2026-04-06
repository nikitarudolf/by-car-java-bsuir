package by.bycar.carservice.dto.response;

import lombok.Builder;

import java.util.Set;

@Builder
public record CarResponseDTO(
        Long id,
        Integer year,
        Integer mileage,
        String vin,
        ModelResponseDTO model,
        Set<FeatureResponseDTO> features) {
}
