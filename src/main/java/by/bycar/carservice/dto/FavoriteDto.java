package by.bycar.carservice.dto;

import by.bycar.carservice.dto.response.AdvertisementResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteDto {
    private Long id;
    private LocalDateTime addedAt;
    private Long userId;
    private Long advertisementId;
    private AdvertisementResponseDTO advertisement;
}
