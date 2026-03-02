package by.bycar.car_service.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record UserResponseDTO(
        Long id,
        String name,
        String phone,
        List<AdvertisementResponseDTO> ads) {
}
