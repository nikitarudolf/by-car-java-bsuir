package by.bycar.carservice.mapper;

import by.bycar.carservice.dto.create.UserCreateDTO;
import by.bycar.carservice.dto.response.UserResponseDTO;
import by.bycar.carservice.dto.update.UserUpdateDTO;
import by.bycar.carservice.model.User;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDTO toResponseDTO(User user);

    User toEntity(UserCreateDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(UserUpdateDTO dto, @MappingTarget User user);
}