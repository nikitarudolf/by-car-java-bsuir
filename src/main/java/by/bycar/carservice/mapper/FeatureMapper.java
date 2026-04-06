package by.bycar.carservice.mapper;

import by.bycar.carservice.dto.create.FeatureCreateDTO;
import by.bycar.carservice.dto.response.FeatureResponseDTO;
import by.bycar.carservice.dto.update.FeatureUpdateDTO;
import by.bycar.carservice.model.Feature;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface FeatureMapper {

    FeatureResponseDTO toResponseDTO(Feature feature);

    Feature toEntity(FeatureCreateDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(FeatureUpdateDTO dto, @MappingTarget Feature feature);
}