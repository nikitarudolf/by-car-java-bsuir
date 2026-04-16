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
class CarServiceTest {

    @Mock
    private CarRepository carRepository;

    @Mock
    private FeatureRepository featureRepository;

    @Mock
    private ModelRepository modelRepository;

    @Mock
    private CarMapper carMapper;

    @InjectMocks
    private CarService carService;

    @Test
    void findAll_ShouldReturnListOfCars() {
        Car car1 = new Car();
        car1.setId(1L);
        car1.setVin("VIN123");
        Car car2 = new Car();
        car2.setId(2L);
        car2.setVin("VIN456");

        when(carRepository.findAll()).thenReturn(List.of(car1, car2));
        when(carMapper.toResponseDTO(car1)).thenReturn(CarResponseDTO.builder()
                .id(1L)
                .year(2020)
                .mileage(50000)
                .vin("VIN123")
                .model(null)
                .features(null)
                .build());
        when(carMapper.toResponseDTO(car2)).thenReturn(CarResponseDTO.builder()
                .id(2L)
                .year(2021)
                .mileage(30000)
                .vin("VIN456")
                .model(null)
                .features(null)
                .build());

        List<CarResponseDTO> result = carService.findAll();

        assertEquals(2, result.size());
        verify(carRepository).findAll();
    }

    @Test
    void update_ShouldReturnUpdatedCar() {
        Long id = 1L;
        CarUpdateDTO updateDTO = new CarUpdateDTO(2022, 60000, "NEWVIN", null, null);
        Car car = new Car();
        car.setId(id);
        car.setVin("VIN123");
        Car updatedCar = new Car();
        updatedCar.setId(id);
        updatedCar.setVin("NEWVIN");
        CarResponseDTO responseDTO = CarResponseDTO.builder()
                .id(id)
                .year(2022)
                .mileage(60000)
                .vin("NEWVIN")
                .model(null)
                .features(null)
                .build();

        when(carRepository.findById(id)).thenReturn(Optional.of(car));
        when(carRepository.save(car)).thenReturn(updatedCar);
        when(carMapper.toResponseDTO(updatedCar)).thenReturn(responseDTO);

        CarResponseDTO result = carService.update(id, updateDTO);

        assertNotNull(result);
        assertEquals("NEWVIN", result.vin());
        verify(carMapper).updateEntityFromDto(updateDTO, car);
        verify(carRepository).save(car);
    }

    @Test
    void update_WithModelId_ShouldUpdateModel() {
        Long id = 1L;
        Long modelId = 2L;
        CarUpdateDTO updateDTO = new CarUpdateDTO(null, null, null, modelId, null);
        Car car = new Car();
        car.setId(id);
        Model model = new Model();
        model.setId(modelId);
        CarResponseDTO responseDTO = CarResponseDTO.builder()
                .id(id)
                .year(2020)
                .mileage(50000)
                .vin("VIN123")
                .model(null)
                .features(null)
                .build();

        when(carRepository.findById(id)).thenReturn(Optional.of(car));
        when(modelRepository.findById(modelId)).thenReturn(Optional.of(model));
        when(carRepository.save(car)).thenReturn(car);
        when(carMapper.toResponseDTO(car)).thenReturn(responseDTO);

        CarResponseDTO result = carService.update(id, updateDTO);

        assertNotNull(result);
        verify(modelRepository).findById(modelId);
    }

    @Test
    void update_WithFeatureIds_ShouldUpdateFeatures() {
        Long id = 1L;
        List<Long> featureIds = List.of(1L, 2L);
        CarUpdateDTO updateDTO = new CarUpdateDTO(null, null, null, null, featureIds);
        Car car = new Car();
        car.setId(id);
        Feature feature1 = new Feature();
        feature1.setId(1L);
        Feature feature2 = new Feature();
        feature2.setId(2L);
        CarResponseDTO responseDTO = CarResponseDTO.builder()
                .id(id)
                .year(2020)
                .mileage(50000)
                .vin("VIN123")
                .model(null)
                .features(null)
                .build();

        when(carRepository.findById(id)).thenReturn(Optional.of(car));
        when(featureRepository.findAllById(featureIds)).thenReturn(List.of(feature1, feature2));
        when(carRepository.save(car)).thenReturn(car);
        when(carMapper.toResponseDTO(car)).thenReturn(responseDTO);

        CarResponseDTO result = carService.update(id, updateDTO);

        assertNotNull(result);
        verify(featureRepository).findAllById(featureIds);
    }

    @Test
    void update_ShouldThrowException_WhenCarNotFound() {
        Long id = 1L;
        CarUpdateDTO updateDTO = new CarUpdateDTO(2020, 50000, "VIN", null, null);

        when(carRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(CarServiceException.class, () -> carService.update(id, updateDTO));
        verify(carRepository, never()).save(any());
    }

    @Test
    void update_ShouldThrowException_WhenModelNotFound() {
        Long id = 1L;
        Long modelId = 2L;
        CarUpdateDTO updateDTO = new CarUpdateDTO(null, null, null, modelId, null);
        Car car = new Car();

        when(carRepository.findById(id)).thenReturn(Optional.of(car));
        when(modelRepository.findById(modelId)).thenReturn(Optional.empty());

        assertThrows(CarServiceException.class, () -> carService.update(id, updateDTO));
        verify(carRepository, never()).save(any());
    }

    @Test
    void findById_ShouldReturnCar_WhenExists() {
        Long id = 1L;
        Car car = new Car();
        car.setId(id);
        car.setVin("VIN123");
        CarResponseDTO responseDTO = CarResponseDTO.builder()
                .id(id)
                .year(2020)
                .mileage(50000)
                .vin("VIN123")
                .model(null)
                .features(null)
                .build();

        when(carRepository.findById(id)).thenReturn(Optional.of(car));
        when(carMapper.toResponseDTO(car)).thenReturn(responseDTO);

        Optional<CarResponseDTO> result = carService.findById(id);

        assertTrue(result.isPresent());
        assertEquals("VIN123", result.get().vin());
        verify(carRepository).findById(id);
    }

    @Test
    void findById_ShouldReturnEmpty_WhenNotExists() {
        Long id = 1L;

        when(carRepository.findById(id)).thenReturn(Optional.empty());

        Optional<CarResponseDTO> result = carService.findById(id);

        assertFalse(result.isPresent());
        verify(carRepository).findById(id);
    }

    @Test
    void deleteById_ShouldCallRepository() {
        Long id = 1L;

        carService.deleteById(id);

        verify(carRepository).deleteById(id);
    }
}