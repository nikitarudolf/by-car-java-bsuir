package by.bycar.carservice.dto.create;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BrandCreateDTO(
        @NotBlank(message = "Название бренда не может быть пустым")
        @Size(min = 2, max = 50, message = "Название бренда должно быть от 2 до 50 символов")
        String name
) {}
