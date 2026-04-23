package by.bycar.carservice.dto.create;

import by.bycar.carservice.model.enums.*;
import jakarta.validation.constraints.*;
import java.util.List;

public record AdvertisementCreateDTO(

        @NotBlank(message = "Заголовок не может быть пустым")
        @Size(min = 5, max = 200, message = "Заголовок должен содержать от 5 до 200 символов")
        String title,

        @NotBlank(message = "Описание не может быть пустым")
        @Size(min = 10, max = 2000, message = "Описание должно содержать от 10 до 2000 символов")
        String description,

        @NotNull(message = "Цена должна быть указана")
        @Positive(message = "Цена должна быть больше нуля")
        Double price,

        @Size(max = 100, message = "Название города не может превышать 100 символов")
        String city,

        @Size(max = 100, message = "Название региона не может превышать 100 символов")
        String region,

        @Size(max = 100, message = "Контактное имя не может превышать 100 символов")
        String contactName,

        Boolean showPhone,

        Boolean negotiable,

        Boolean exchangePossible,

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
        List<Long> featureIds,

        EngineType engineType,

        @DecimalMin(value = "0.0", message = "Объем двигателя не может быть отрицательным")
        @DecimalMax(value = "10.0", message = "Объем двигателя не может превышать 10.0 л")
        Double engineVolume,

        @Positive(message = "Мощность двигателя должна быть положительной")
        Integer enginePower,

        TransmissionType transmissionType,

        DriveType driveType,

        BodyType bodyType,

        @Size(max = 50, message = "Название цвета не может превышать 50 символов")
        String color,

        @Min(value = 2, message = "Количество дверей не может быть меньше 2")
        @Max(value = 5, message = "Количество дверей не может быть больше 5")
        Integer doorsCount,

        @DecimalMin(value = "0.0", message = "Расход топлива не может быть отрицательным")
        Double fuelConsumption,

        CarCondition condition,

        Boolean isCustomsCleared
) {
}