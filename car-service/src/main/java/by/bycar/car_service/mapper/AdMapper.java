package by.bycar.car_service.mapper;

import by.bycar.car_service.dto.AdDTO;
import by.bycar.car_service.model.Advertisement;
import org.springframework.stereotype.Component;

@Component
public class AdMapper {

    public Advertisement toEntity(AdDTO adDTO) {
        return Advertisement.builder()
                .brand(adDTO.brand())
                .model(adDTO.model())
                .year(adDTO.year())
                .price(adDTO.price())
                .build();
    }

    public AdDTO toDTO(Advertisement ad) {
        return new AdDTO(ad.getBrand(), ad.getModel(), ad.getYear(), ad.getPrice());
    }
}
