package by.bycar.carservice.dto.create;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserCreateDTO(
        @NotBlank(message = "Имя пользователя обязательно")
        @Size(min = 2, max = 50, message = "Имя должно быть от 2 до 50 символов")
        String name,

        @NotBlank(message = "Номер телефона обязателен")
        @Pattern(regexp = "^\\+?\\d{10,15}$", message = "Неверный формат телефона (пример: +375291234567)")
        String phone
) {}
