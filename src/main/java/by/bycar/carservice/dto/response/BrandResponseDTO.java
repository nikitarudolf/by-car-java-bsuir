package by.bycar.carservice.dto.response;

import lombok.Builder;

@Builder
public record BrandResponseDTO(
        Long id,
        String name) {
}
