package by.bycar.carservice.dto.update;

import lombok.Builder;

import java.util.List;


@Builder
public record UserUpdateDTO(
        String name,
        String phone,
        List<Long> adIds) {
}
