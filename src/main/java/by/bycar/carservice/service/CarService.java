package by.bycar.carservice.service;

import by.bycar.carservice.dto.response.CarResponseDTO;
import by.bycar.carservice.mapper.CarMapper;
import by.bycar.carservice.repository.CarRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;
    private final CarMapper carMapper;

    public List<CarResponseDTO> findAll() {
        return carRepository.findAll()
                .stream()
                .map(carMapper::toDTO)
                .toList();
    }

    @Transactional
    public void deleteById(Long id) {
        carRepository.deleteById(id);
    }
}
