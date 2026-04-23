package by.bycar.carservice.dto.response;

import by.bycar.carservice.model.enums.AdvertisementStatus;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record AdvertisementResponseDTO(
        Long id,
        String title,
        String description,
        Double price,
        String city,
        String region,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Long viewsCount,
        AdvertisementStatus status,
        Boolean showPhone,
        String contactName,
        Boolean negotiable,
        Boolean exchangePossible,
        String sellerName,
        String sellerPhone,
        CarResponseDTO car) {
}
