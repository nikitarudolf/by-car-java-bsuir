package by.bycar.carservice.mapper;

import by.bycar.carservice.dto.response.CarResponseDTO;
import by.bycar.carservice.dto.update.CarUpdateDTO;
import by.bycar.carservice.model.Car;
import org.mapstruct.*;
import org.springframework.stereotype.Component;


@Component
@Mapper(componentModel = "spring", uses = {ModelMapper.class, FeatureMapper.class})
public interface CarMapper {

    @Mapping(source = "model", target = "model")
    @Mapping(source = "features", target = "features")
    CarResponseDTO toResponseDTO(Car car);

    @Mapping(target = "model", ignore = true)
    @Mapping(target = "features", ignore = true)
    void updateEntityFromDto(CarUpdateDTO dto, @MappingTarget Car entity);
}