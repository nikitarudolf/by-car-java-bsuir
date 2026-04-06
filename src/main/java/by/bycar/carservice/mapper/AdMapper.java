package by.bycar.carservice.mapper;

import by.bycar.carservice.dto.create.AdvertisementCreateDTO;
import by.bycar.carservice.dto.response.AdvertisementResponseDTO;
import by.bycar.carservice.dto.update.AdvertisementUpdateDTO;
import by.bycar.carservice.model.Advertisement;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", uses = {CarMapper.class})
public interface AdMapper {

    @Mapping(source = "user.name", target = "sellerName")
    @Mapping(source = "user.phone", target = "sellerPhone")
    @Mapping(source = "car", target = "car")
    AdvertisementResponseDTO toResponseDTO(Advertisement advertisement);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "car", ignore = true)
    Advertisement toEntity(AdvertisementCreateDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "car", ignore = true)
    void updateEntityFromDto(AdvertisementUpdateDTO dto, @MappingTarget Advertisement advertisement);
}