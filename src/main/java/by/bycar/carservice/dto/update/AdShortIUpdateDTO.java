package by.bycar.carservice.dto.update;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.Builder;

@Builder
public record AdShortIUpdateDTO(
        @Positive(message = "Цена должна быть больше нуля")
        Double price,

        String modelName,

        @Min(1900) @Max(2026)
        Integer year
) {}
