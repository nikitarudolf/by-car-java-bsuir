package by.bycar.carservice.dto.update;

import jakarta.validation.constraints.Pattern;
import lombok.Builder;

import java.util.List;


@Builder
public record UserUpdateDTO(
        String name,

        @Pattern(regexp = "^\\+?\\d{10,15}$", message = "Неверный формат телефона")
        String phone,

        List<Long> adIds
) {}
