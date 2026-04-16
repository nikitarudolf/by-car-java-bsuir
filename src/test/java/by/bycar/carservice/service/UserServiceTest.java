package by.bycar.carservice.service;

import by.bycar.carservice.dto.create.UserCreateDTO;
import by.bycar.carservice.dto.response.UserResponseDTO;
import by.bycar.carservice.dto.update.UserUpdateDTO;
import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.mapper.UserMapper;
import by.bycar.carservice.model.User;
import by.bycar.carservice.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService;

    @Test
    void create_ShouldReturnUserResponseDTO() {
        UserCreateDTO createDTO = new UserCreateDTO("John", "+1234567890");
        User user = new User();
        user.setName("John");
        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setName("John");
        UserResponseDTO responseDTO = UserResponseDTO.builder()
                .id(1L)
                .name("John")
                .phone("+1234567890")
                .ads(null)
                .build();

        when(userMapper.toEntity(createDTO)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(savedUser);
        when(userMapper.toResponseDTO(savedUser)).thenReturn(responseDTO);

        UserResponseDTO result = userService.create(createDTO);

        assertNotNull(result);
        assertEquals(1L, result.id());
        assertEquals("John", result.name());
        verify(userRepository).save(user);
    }

    @Test
    void findAll_ShouldReturnListOfUsers() {
        User user1 = new User();
        user1.setId(1L);
        user1.setName("John");
        User user2 = new User();
        user2.setId(2L);
        user2.setName("Jane");

        when(userRepository.findAll()).thenReturn(List.of(user1, user2));
        when(userMapper.toResponseDTO(user1)).thenReturn(UserResponseDTO.builder().id(1L).name("John").phone("+1234567890").ads(null).build());
        when(userMapper.toResponseDTO(user2)).thenReturn(UserResponseDTO.builder().id(2L).name("Jane").phone("+0987654321").ads(null).build());

        List<UserResponseDTO> result = userService.findAll();

        assertEquals(2, result.size());
        verify(userRepository).findAll();
    }

    @Test
    void update_ShouldReturnUpdatedUser() {
        Long id = 1L;
        UserUpdateDTO updateDTO = new UserUpdateDTO("Updated John", "+1111111111", null);
        User user = new User();
        user.setId(id);
        user.setName("John");
        User updatedUser = new User();
        updatedUser.setId(id);
        updatedUser.setName("Updated John");
        UserResponseDTO responseDTO = UserResponseDTO.builder()
                .id(id)
                .name("Updated John")
                .phone("+1111111111")
                .ads(null)
                .build();

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(updatedUser);
        when(userMapper.toResponseDTO(updatedUser)).thenReturn(responseDTO);

        UserResponseDTO result = userService.update(id, updateDTO);

        assertNotNull(result);
        assertEquals("Updated John", result.name());
        verify(userMapper).updateEntityFromDto(updateDTO, user);
        verify(userRepository).save(user);
    }

    @Test
    void update_ShouldThrowException_WhenUserNotFound() {
        Long id = 1L;
        UserUpdateDTO updateDTO = new UserUpdateDTO("John", "+1234567890", null);

        when(userRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(CarServiceException.class, () -> userService.update(id, updateDTO));
        verify(userRepository, never()).save(any());
    }

    @Test
    void findById_ShouldReturnUser_WhenExists() {
        Long id = 1L;
        User user = new User();
        user.setId(id);
        user.setName("John");
        UserResponseDTO responseDTO = UserResponseDTO.builder()
                .id(id)
                .name("John")
                .phone("+1234567890")
                .ads(null)
                .build();

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userMapper.toResponseDTO(user)).thenReturn(responseDTO);

        Optional<UserResponseDTO> result = userService.findById(id);

        assertTrue(result.isPresent());
        assertEquals("John", result.get().name());
        verify(userRepository).findById(id);
    }

    @Test
    void findById_ShouldReturnEmpty_WhenNotExists() {
        Long id = 1L;

        when(userRepository.findById(id)).thenReturn(Optional.empty());

        Optional<UserResponseDTO> result = userService.findById(id);

        assertFalse(result.isPresent());
        verify(userRepository).findById(id);
    }

    @Test
    void deleteById_ShouldCallRepository() {
        Long id = 1L;

        userService.deleteById(id);

        verify(userRepository).deleteById(id);
    }
}