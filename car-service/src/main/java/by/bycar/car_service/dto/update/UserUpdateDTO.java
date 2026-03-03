package by.bycar.car_service.dto.update;

import lombok.Builder;


@Builder
public record UserUpdateDTO(
        String name,
        String phone) {
}
