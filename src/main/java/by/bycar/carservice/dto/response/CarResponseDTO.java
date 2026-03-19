package by.bycar.carservice.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record CarResponseDTO(
        Long id,
        Integer year,
        Integer mileage,
        String vin,
        ModelResponseDTO model,
        List<FeatureResponseDTO> features) {
}
