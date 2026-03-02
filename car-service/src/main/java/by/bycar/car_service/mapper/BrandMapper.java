package by.bycar.car_service.mapper;

import by.bycar.car_service.dto.create.BrandCreateDTO;
import by.bycar.car_service.dto.response.BrandResponseDTO;
import by.bycar.car_service.model.Brand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
@RequiredArgsConstructor
public class BrandMapper {
    public Brand toEntity(BrandCreateDTO brandCreateDTO) {
        return Brand.builder()
                .name(brandCreateDTO.name())
                .model(new HashSet<>())
                .build();
    }

    public BrandResponseDTO toDTO(Brand brand) {
        return BrandResponseDTO.builder()
                .id(brand.getId())
                .name(brand.getName())
                .build();
    }
}
