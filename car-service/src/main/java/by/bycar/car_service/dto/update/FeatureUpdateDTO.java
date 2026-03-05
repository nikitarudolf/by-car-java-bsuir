package by.bycar.car_service.dto.update;

import lombok.Builder;

import java.util.Set;

@Builder
public record FeatureUpdateDTO(
        String name,
        Set<Long> carIds) {
}
