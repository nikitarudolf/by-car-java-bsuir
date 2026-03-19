package by.bycar.carservice.dto.update;

import lombok.Builder;

@Builder
public record ModelUpdateDTO(
        String name,
        Long brandId) {
}
