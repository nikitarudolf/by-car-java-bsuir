package by.bycar.carservice.service;

import by.bycar.carservice.dto.response.CarResponseDTO;
import by.bycar.carservice.dto.update.CarUpdateDTO;
import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.mapper.CarMapper;
import by.bycar.carservice.model.Car;
import by.bycar.carservice.model.Feature;
import by.bycar.carservice.model.Model;
import by.bycar.carservice.repository.CarRepository;
import by.bycar.carservice.repository.FeatureRepository;
import by.bycar.carservice.repository.ModelRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;
    private final FeatureRepository featureRepository;
    private final ModelRepository modelRepository;
    private final CarMapper carMapper;

    public List<CarResponseDTO> findAll() {
        return carRepository.findAll()
                .stream()
                .map(carMapper::toResponseDTO)
                .toList();
    }

    public Optional<CarResponseDTO> findById(Long id) {
        return carRepository.findById(id)
                .map(carMapper::toResponseDTO);
    }

    @Transactional
    public CarResponseDTO update(Long id, CarUpdateDTO dto) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new CarServiceException("Автомобиль не найден"));

        carMapper.updateEntityFromDto(dto, car);

        if (dto.modelId() != null) {
            Model model = modelRepository.findById(dto.modelId())
                    .orElseThrow(() -> new CarServiceException("Модель не найдена"));
            car.setModel(model);
        }

        if (dto.featureIds() != null) {
            List<Feature> features = featureRepository.findAllById(dto.featureIds());
            car.setFeatures(new HashSet<>(features));
        }

        return carMapper.toResponseDTO(carRepository.save(car));
    }

    @Transactional
    public void deleteById(Long id) {
        carRepository.deleteById(id);
    }
}
