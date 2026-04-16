package by.bycar.carservice.service;

import by.bycar.carservice.dto.create.ModelCreateDTO;
import by.bycar.carservice.dto.response.ModelResponseDTO;
import by.bycar.carservice.dto.update.ModelUpdateDTO;
import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.mapper.ModelMapper;
import by.bycar.carservice.model.Brand;
import by.bycar.carservice.model.Model;
import by.bycar.carservice.repository.BrandRepository;
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
class ModelServiceTest {

    @Mock
    private ModelRepository modelRepository;

    @Mock
    private BrandRepository brandRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private ModelService modelService;

    @Test
    void create_ShouldReturnModelResponseDTO() {
        ModelCreateDTO createDTO = new ModelCreateDTO("Camry", 1L);
        Model model = new Model();
        model.setName("Camry");
        Model savedModel = new Model();
        savedModel.setId(1L);
        savedModel.setName("Camry");
        ModelResponseDTO responseDTO = ModelResponseDTO.builder()
                .id(1L)
                .name("Camry")
                .brand(null)
                .build();

        when(modelMapper.toEntity(createDTO)).thenReturn(model);
        when(modelRepository.save(model)).thenReturn(savedModel);
        when(modelMapper.toResponseDTO(savedModel)).thenReturn(responseDTO);

        ModelResponseDTO result = modelService.create(createDTO);

        assertNotNull(result);
        assertEquals(1L, result.id());
        assertEquals("Camry", result.name());
        verify(modelRepository).save(model);
    }

    @Test
    void findAll_ShouldReturnListOfModels() {
        Model model1 = new Model();
        model1.setId(1L);
        model1.setName("Camry");
        Model model2 = new Model();
        model2.setId(2L);
        model2.setName("Accord");

        when(modelRepository.findAll()).thenReturn(List.of(model1, model2));
        when(modelMapper.toResponseDTO(model1)).thenReturn(ModelResponseDTO.builder().id(1L).name("Camry").brand(null).build());
        when(modelMapper.toResponseDTO(model2)).thenReturn(ModelResponseDTO.builder().id(2L).name("Accord").brand(null).build());

        List<ModelResponseDTO> result = modelService.findAll();

        assertEquals(2, result.size());
        verify(modelRepository).findAll();
    }

    @Test
    void update_ShouldReturnUpdatedModel() {
        Long id = 1L;
        ModelUpdateDTO updateDTO = new ModelUpdateDTO("Updated Camry", null);
        Model model = new Model();
        model.setId(id);
        model.setName("Camry");
        Model updatedModel = new Model();
        updatedModel.setId(id);
        updatedModel.setName("Updated Camry");
        ModelResponseDTO responseDTO = ModelResponseDTO.builder()
                .id(id)
                .name("Updated Camry")
                .brand(null)
                .build();

        when(modelRepository.findById(id)).thenReturn(Optional.of(model));
        when(modelRepository.save(model)).thenReturn(updatedModel);
        when(modelMapper.toResponseDTO(updatedModel)).thenReturn(responseDTO);

        ModelResponseDTO result = modelService.update(id, updateDTO);

        assertNotNull(result);
        assertEquals("Updated Camry", result.name());
        verify(modelMapper).updateEntityFromDto(updateDTO, model);
        verify(modelRepository).save(model);
    }

    @Test
    void update_WithBrandId_ShouldUpdateBrand() {
        Long id = 1L;
        Long brandId = 2L;
        ModelUpdateDTO updateDTO = new ModelUpdateDTO("Camry", brandId);
        Model model = new Model();
        model.setId(id);
        Brand brand = new Brand();
        brand.setId(brandId);
        ModelResponseDTO responseDTO = ModelResponseDTO.builder()
                .id(id)
                .name("Camry")
                .brand(null)
                .build();

        when(modelRepository.findById(id)).thenReturn(Optional.of(model));
        when(brandRepository.findById(brandId)).thenReturn(Optional.of(brand));
        when(modelRepository.save(model)).thenReturn(model);
        when(modelMapper.toResponseDTO(model)).thenReturn(responseDTO);

        ModelResponseDTO result = modelService.update(id, updateDTO);

        assertNotNull(result);
        verify(brandRepository).findById(brandId);
    }

    @Test
    void update_ShouldThrowException_WhenModelNotFound() {
        Long id = 1L;
        ModelUpdateDTO updateDTO = new ModelUpdateDTO("Camry", null);

        when(modelRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(CarServiceException.class, () -> modelService.update(id, updateDTO));
        verify(modelRepository, never()).save(any());
    }

    @Test
    void update_ShouldThrowException_WhenBrandNotFound() {
        Long id = 1L;
        Long brandId = 2L;
        ModelUpdateDTO updateDTO = new ModelUpdateDTO("Camry", brandId);
        Model model = new Model();

        when(modelRepository.findById(id)).thenReturn(Optional.of(model));
        when(brandRepository.findById(brandId)).thenReturn(Optional.empty());

        assertThrows(CarServiceException.class, () -> modelService.update(id, updateDTO));
        verify(modelRepository, never()).save(any());
    }

    @Test
    void findById_ShouldReturnModel_WhenExists() {
        Long id = 1L;
        Model model = new Model();
        model.setId(id);
        model.setName("Camry");
        ModelResponseDTO responseDTO = ModelResponseDTO.builder()
                .id(id)
                .name("Camry")
                .brand(null)
                .build();

        when(modelRepository.findById(id)).thenReturn(Optional.of(model));
        when(modelMapper.toResponseDTO(model)).thenReturn(responseDTO);

        Optional<ModelResponseDTO> result = modelService.findById(id);

        assertTrue(result.isPresent());
        assertEquals("Camry", result.get().name());
        verify(modelRepository).findById(id);
    }

    @Test
    void findById_ShouldReturnEmpty_WhenNotExists() {
        Long id = 1L;

        when(modelRepository.findById(id)).thenReturn(Optional.empty());

        Optional<ModelResponseDTO> result = modelService.findById(id);

        assertFalse(result.isPresent());
        verify(modelRepository).findById(id);
    }

    @Test
    void deleteById_ShouldCallRepository() {
        Long id = 1L;

        modelService.deleteById(id);

        verify(modelRepository).deleteById(id);
    }
}