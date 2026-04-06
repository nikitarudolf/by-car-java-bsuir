package by.bycar.carservice.controller;


import by.bycar.carservice.dto.create.UserCreateDTO;
import by.bycar.carservice.dto.response.UserResponseDTO;
import by.bycar.carservice.dto.update.UserUpdateDTO;
import by.bycar.carservice.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public UserResponseDTO create(@RequestBody @Valid UserCreateDTO userCreateDTO) {
        return userService.create(userCreateDTO);
    }

    @PatchMapping("/{id}")
    public UserResponseDTO update(@PathVariable Long id, @RequestBody @Valid UserUpdateDTO userUpdateDTO) {
        return userService.update(id, userUpdateDTO);
    }

    @GetMapping
    public List<UserResponseDTO> findAll() {
        return userService.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }
}
