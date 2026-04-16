package by.bycar.carservice.service;

import by.bycar.carservice.dto.create.FeatureCreateDTO;
import by.bycar.carservice.dto.response.FeatureResponseDTO;
import by.bycar.carservice.dto.update.FeatureUpdateDTO;
import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.mapper.FeatureMapper;
import by.bycar.carservice.model.Feature;
import by.bycar.carservice.repository.FeatureRepository;
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
class FeatureServiceTest {

    @Mock
    private FeatureRepository featureRepository;

    @Mock
    private FeatureMapper featureMapper;

    @InjectMocks
    private FeatureService featureService;

    @Test
    void create_ShouldReturnFeatureResponseDTO() {
        FeatureCreateDTO createDTO = new FeatureCreateDTO("ABS");
        Feature feature = new Feature();
        feature.setName("ABS");
        Feature savedFeature = new Feature();
        savedFeature.setId(1L);
        savedFeature.setName("ABS");
        FeatureResponseDTO responseDTO = new FeatureResponseDTO(1L, "ABS");

        when(featureMapper.toEntity(createDTO)).thenReturn(feature);
        when(featureRepository.save(feature)).thenReturn(savedFeature);
        when(featureMapper.toResponseDTO(savedFeature)).thenReturn(responseDTO);

        FeatureResponseDTO result = featureService.create(createDTO);

        assertNotNull(result);
        assertEquals(1L, result.id());
        assertEquals("ABS", result.name());
        verify(featureRepository).save(feature);
    }

    @Test
    void findAll_ShouldReturnListOfFeatures() {
        Feature feature1 = new Feature();
        feature1.setId(1L);
        feature1.setName("ABS");
        Feature feature2 = new Feature();
        feature2.setId(2L);
        feature2.setName("Airbag");

        when(featureRepository.findAll()).thenReturn(List.of(feature1, feature2));
        when(featureMapper.toResponseDTO(feature1)).thenReturn(new FeatureResponseDTO(1L, "ABS"));
        when(featureMapper.toResponseDTO(feature2)).thenReturn(new FeatureResponseDTO(2L, "Airbag"));

        List<FeatureResponseDTO> result = featureService.findAll();

        assertEquals(2, result.size());
        verify(featureRepository).findAll();
    }

    @Test
    void saveAll_ShouldReturnListOfSavedFeatures() {
        FeatureCreateDTO dto1 = new FeatureCreateDTO("ABS");
        FeatureCreateDTO dto2 = new FeatureCreateDTO("Airbag");
        Feature feature1 = new Feature();
        feature1.setName("ABS");
        Feature feature2 = new Feature();
        feature2.setName("Airbag");
        Feature savedFeature1 = new Feature();
        savedFeature1.setId(1L);
        savedFeature1.setName("ABS");
        Feature savedFeature2 = new Feature();
        savedFeature2.setId(2L);
        savedFeature2.setName("Airbag");

        when(featureMapper.toEntity(dto1)).thenReturn(feature1);
        when(featureMapper.toEntity(dto2)).thenReturn(feature2);
        when(featureRepository.saveAll(anyList())).thenReturn(List.of(savedFeature1, savedFeature2));
        when(featureMapper.toResponseDTO(savedFeature1)).thenReturn(new FeatureResponseDTO(1L, "ABS"));
        when(featureMapper.toResponseDTO(savedFeature2)).thenReturn(new FeatureResponseDTO(2L, "Airbag"));

        List<FeatureResponseDTO> result = featureService.saveAll(List.of(dto1, dto2));

        assertEquals(2, result.size());
        verify(featureRepository).saveAll(anyList());
    }

    @Test
    void saveAll_ShouldThrowException_WhenFeatureNameIsError() {
        FeatureCreateDTO dto = new FeatureCreateDTO("error");
        Feature feature = new Feature();
        feature.setName("error");

        when(featureMapper.toEntity(dto)).thenReturn(feature);

        List<FeatureCreateDTO> dtos = List.of(dto);
        assertThrows(RuntimeException.class, () -> featureService.saveAll(dtos));
        verify(featureRepository, never()).saveAll(anyList());
    }

    @Test
    void saveAll_ShouldReturnEmptyList_WhenDtosIsNull() {
        List<FeatureResponseDTO> result = featureService.saveAll(null);

        assertTrue(result.isEmpty());
        verify(featureRepository).saveAll(anyList());
    }

    @Test
    void update_ShouldReturnUpdatedFeature() {
        Long id = 1L;
        FeatureUpdateDTO updateDTO = new FeatureUpdateDTO("Updated ABS", null);
        Feature feature = new Feature();
        feature.setId(id);
        feature.setName("ABS");
        Feature updatedFeature = new Feature();
        updatedFeature.setId(id);
        updatedFeature.setName("Updated ABS");
        FeatureResponseDTO responseDTO = new FeatureResponseDTO(id, "Updated ABS");

        when(featureRepository.findById(id)).thenReturn(Optional.of(feature));
        when(featureRepository.save(feature)).thenReturn(updatedFeature);
        when(featureMapper.toResponseDTO(updatedFeature)).thenReturn(responseDTO);

        FeatureResponseDTO result = featureService.update(id, updateDTO);

        assertNotNull(result);
        assertEquals("Updated ABS", result.name());
        verify(featureMapper).updateEntityFromDto(updateDTO, feature);
        verify(featureRepository).save(feature);
    }

    @Test
    void update_ShouldThrowException_WhenFeatureNotFound() {
        Long id = 1L;
        FeatureUpdateDTO updateDTO = new FeatureUpdateDTO("ABS", null);

        when(featureRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(CarServiceException.class, () -> featureService.update(id, updateDTO));
        verify(featureRepository, never()).save(any());
    }

    @Test
    void findById_ShouldReturnFeature_WhenExists() {
        Long id = 1L;
        Feature feature = new Feature();
        feature.setId(id);
        feature.setName("ABS");
        FeatureResponseDTO responseDTO = new FeatureResponseDTO(id, "ABS");

        when(featureRepository.findById(id)).thenReturn(Optional.of(feature));
        when(featureMapper.toResponseDTO(feature)).thenReturn(responseDTO);

        Optional<FeatureResponseDTO> result = featureService.findById(id);

        assertTrue(result.isPresent());
        assertEquals("ABS", result.get().name());
        verify(featureRepository).findById(id);
    }

    @Test
    void findById_ShouldReturnEmpty_WhenNotExists() {
        Long id = 1L;

        when(featureRepository.findById(id)).thenReturn(Optional.empty());

        Optional<FeatureResponseDTO> result = featureService.findById(id);

        assertFalse(result.isPresent());
        verify(featureRepository).findById(id);
    }

    @Test
    void deleteById_ShouldCallRepository() {
        Long id = 1L;

        featureService.deleteById(id);

        verify(featureRepository).deleteById(id);
    }
}