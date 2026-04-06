package by.bycar.carservice.dto.update;

import lombok.Builder;

import java.util.Set;

@Builder
public record BrandUpdateDTO(
        String name,

        Set<Long> modelIds
) {}
