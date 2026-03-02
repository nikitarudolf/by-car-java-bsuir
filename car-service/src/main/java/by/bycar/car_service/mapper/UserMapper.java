package by.bycar.car_service.mapper;

import by.bycar.car_service.dto.create.UserCreateDTO;
import by.bycar.car_service.dto.response.UserResponseDTO;
import by.bycar.car_service.model.Advertisement;
import by.bycar.car_service.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.LinkedList;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final AdMapper adMapper;

    public User toEntity(UserCreateDTO userCreateDTO) {
        return User.builder()
                .name(userCreateDTO.name())
                .phone(userCreateDTO.phone())
                .ads(new LinkedList<Advertisement>())
                .build();
    }

    public UserResponseDTO toDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .phone(user.getPhone())
                .ads(user.getAds()
                        .stream()
                        .map(adMapper::toDTO)
                        .toList())
                .build();
    }
}
