package by.bycar.carservice.mapper;

import by.bycar.carservice.dto.create.BrandCreateDTO;
import by.bycar.carservice.dto.response.BrandResponseDTO;
import by.bycar.carservice.model.Brand;
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
