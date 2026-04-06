package by.bycar.carservice.dto.create;

import jakarta.validation.constraints.*;
import java.util.List;

public record AdvertisementCreateDTO(

        @NotBlank(message = "Описание не может быть пустым")
        @Size(min = 10, max = 2000, message = "Описание должно содержать от 10 до 2000 символов")
        String description,

        @NotNull(message = "Цена должна быть указана")
        @Positive(message = "Цена должна быть больше нуля")
        Double price,

        @NotNull(message = "ID пользователя обязателен")
        @Positive(message = "ID пользователя должен быть положительным числом")
        Long userId,

        @NotNull(message = "ID модели обязателен")
        @Positive(message = "ID модели должен быть положительным числом")
        Long modelId,

        @NotNull(message = "Год выпуска обязателен")
        @Min(value = 1900, message = "Год выпуска не может быть раньше 1900")
        @Max(value = 2026, message = "Год выпуска не может быть в будущем")
        Integer year,

        @NotNull(message = "Пробег обязателен")
        @PositiveOrZero(message = "Пробег не может быть отрицательным")
        Integer mileage,

        @NotBlank(message = "VIN-номер обязателен")
        @Size(min = 17, max = 17, message = "VIN-номер должен состоять ровно из 17 символов")
        String vin,

        @NotNull(message = "Список характеристик не должен быть null (но может быть пустым)")
        List<Long> featureIds
) {
}