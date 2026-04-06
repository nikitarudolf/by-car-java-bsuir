package by.bycar.carservice.dto.update;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.List;

@Builder
public record AdvertisementUpdateDTO(
        String description,

        @Positive(message = "Цена должна быть больше нуля")
        Double price,

        Long modelId,

        @Min(1900) @Max(2026)
        Integer year,

        @PositiveOrZero(message = "Пробег не может быть отрицательным")
        Integer mileage,

        @Size(min = 17, max = 17, message = "VIN должен быть 17 символов")
        String vin,

        List<Long> featureIds
) {}
