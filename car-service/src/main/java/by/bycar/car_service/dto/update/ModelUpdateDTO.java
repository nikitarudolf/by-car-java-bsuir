package by.bycar.car_service.dto.update;

import lombok.Builder;

@Builder
public record ModelUpdateDTO(
        String name,
        Long brandId) {
}
