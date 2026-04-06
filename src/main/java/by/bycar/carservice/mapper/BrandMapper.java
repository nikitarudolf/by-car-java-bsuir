package by.bycar.carservice.mapper;

import by.bycar.carservice.dto.create.BrandCreateDTO;
import by.bycar.carservice.dto.response.BrandResponseDTO;
import by.bycar.carservice.dto.update.BrandUpdateDTO;
import by.bycar.carservice.model.Brand;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface BrandMapper {

    BrandResponseDTO toResponseDTO(Brand brand);

    Brand toEntity(BrandCreateDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(BrandUpdateDTO dto, @MappingTarget Brand brand);
}