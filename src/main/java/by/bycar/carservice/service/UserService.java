package by.bycar.carservice.service;

import by.bycar.carservice.dto.create.UserCreateDTO;
import by.bycar.carservice.dto.response.UserResponseDTO;
import by.bycar.carservice.mapper.UserMapper;
import by.bycar.carservice.model.User;
import by.bycar.carservice.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    public UserResponseDTO create(UserCreateDTO userCreateDTO) {
        User user = userMapper.toEntity(userCreateDTO);
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    public List<UserResponseDTO> findAll() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDTO)
                .toList();
    }

    @Transactional
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
