package by.bycar.carservice.mapper;

import by.bycar.carservice.dto.create.ModelCreateDTO;
import by.bycar.carservice.dto.response.ModelResponseDTO;
import by.bycar.carservice.dto.update.ModelUpdateDTO;
import by.bycar.carservice.model.Model;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", uses = {BrandMapper.class})
public interface ModelMapper {

    @Mapping(source = "brand", target = "brand")
    ModelResponseDTO toResponseDTO(Model model);

    @Mapping(target = "brand", ignore = true)
    Model toEntity(ModelCreateDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "brand", ignore = true)
    void updateEntityFromDto(ModelUpdateDTO dto, @MappingTarget Model model);
}