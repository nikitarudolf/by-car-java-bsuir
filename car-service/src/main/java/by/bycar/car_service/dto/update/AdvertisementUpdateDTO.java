package by.bycar.car_service.dto.update;

import lombok.Builder;

@Builder
public record AdvertisementUpdateDTO(
        String description,
        Double price) {
}
