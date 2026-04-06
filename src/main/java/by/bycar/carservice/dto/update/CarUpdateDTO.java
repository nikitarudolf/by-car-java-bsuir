package by.bycar.carservice.dto.update;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.List;

@Builder
public record CarUpdateDTO(
        @Min(1900) @Max(2026)
        Integer year,

        @PositiveOrZero
        Integer mileage,

        @Size(min = 17, max = 17)
        String vin,

        Long modelId,

        List<Long> featureIds
) {}
