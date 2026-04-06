package by.bycar.carservice.dto.create;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record FeatureCreateDTO(
        @NotBlank(message = "Название опции не может быть пустым")
        @Size(min = 2, max = 100, message = "Название опции слишком короткое или длинное")
        String name
) {}
