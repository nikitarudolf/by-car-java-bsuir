package by.bycar.carservice.service;

import by.bycar.carservice.dto.create.BrandCreateDTO;
import by.bycar.carservice.dto.response.BrandResponseDTO;
import by.bycar.carservice.dto.update.BrandUpdateDTO;
import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.mapper.BrandMapper;
import by.bycar.carservice.model.Brand;
import by.bycar.carservice.repository.BrandRepository;
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
class
BrandServiceTest {

    @Mock
    private BrandRepository brandRepository;

    @Mock
    private BrandMapper brandMapper;

    @InjectMocks
    private BrandService brandService;

    @Test
    void create_ShouldReturnBrandResponseDTO() {
        BrandCreateDTO createDTO = new BrandCreateDTO("Toyota");
        Brand brand = new Brand();
        brand.setName("Toyota");
        Brand savedBrand = new Brand();
        savedBrand.setId(1L);
        savedBrand.setName("Toyota");
        BrandResponseDTO responseDTO = BrandResponseDTO.builder()
                .id(1L)
                .name("Toyota")
                .build();

        when(brandMapper.toEntity(createDTO)).thenReturn(brand);
        when(brandRepository.save(brand)).thenReturn(savedBrand);
        when(brandMapper.toResponseDTO(savedBrand)).thenReturn(responseDTO);

        BrandResponseDTO result = brandService.create(createDTO);

        assertNotNull(result);
        assertEquals(1L, result.id());
        assertEquals("Toyota", result.name());
        verify(brandRepository).save(brand);
    }

    @Test
    void findAll_ShouldReturnListOfBrands() {
        Brand brand1 = new Brand();
        brand1.setId(1L);
        brand1.setName("Toyota");
        Brand brand2 = new Brand();
        brand2.setId(2L);
        brand2.setName("Honda");

        when(brandRepository.findAll()).thenReturn(List.of(brand1, brand2));
        when(brandMapper.toResponseDTO(brand1)).thenReturn(BrandResponseDTO.builder().id(1L).name("Toyota").build());
        when(brandMapper.toResponseDTO(brand2)).thenReturn(BrandResponseDTO.builder().id(2L).name("Honda").build());

        List<BrandResponseDTO> result = brandService.findALl();

        assertEquals(2, result.size());
        verify(brandRepository).findAll();
    }

    @Test
    void update_ShouldReturnUpdatedBrand() {
        Long id = 1L;
        BrandUpdateDTO updateDTO = new BrandUpdateDTO("Updated Toyota", null);
        Brand brand = new Brand();
        brand.setId(id);
        brand.setName("Toyota");
        Brand updatedBrand = new Brand();
        updatedBrand.setId(id);
        updatedBrand.setName("Updated Toyota");
        BrandResponseDTO responseDTO = BrandResponseDTO.builder()
                .id(id)
                .name("Updated Toyota")
                .build();

        when(brandRepository.findById(id)).thenReturn(Optional.of(brand));
        when(brandRepository.save(brand)).thenReturn(updatedBrand);
        when(brandMapper.toResponseDTO(updatedBrand)).thenReturn(responseDTO);

        BrandResponseDTO result = brandService.update(id, updateDTO);

        assertNotNull(result);
        assertEquals("Updated Toyota", result.name());
        verify(brandMapper).updateEntityFromDto(updateDTO, brand);
        verify(brandRepository).save(brand);
    }

    @Test
    void update_ShouldThrowException_WhenBrandNotFound() {
        Long id = 1L;
        BrandUpdateDTO updateDTO = new BrandUpdateDTO("Updated Toyota", null);

        when(brandRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(CarServiceException.class, () -> brandService.update(id, updateDTO));
        verify(brandRepository, never()).save(any());
    }

    @Test
    void deleteById_ShouldCallRepository() {
        Long id = 1L;

        brandService.deleteById(id);

        verify(brandRepository).deleteById(id);
    }
}