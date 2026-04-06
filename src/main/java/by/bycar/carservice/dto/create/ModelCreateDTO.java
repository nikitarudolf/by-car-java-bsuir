package by.bycar.carservice.dto.create;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ModelCreateDTO(
        @NotBlank(message = "Название модели не может быть пустым")
        String name,

        @NotNull(message = "ID бренда обязателен")
        @Positive(message = "ID бренда должен быть положительным числом")
        Long brandId
) {}
