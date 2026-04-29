package by.bycar.carservice.service;

import by.bycar.carservice.cache.AdvertisementIndex;
import by.bycar.carservice.concurrency.ViewCounterService;
import by.bycar.carservice.dto.SearchCriteria;
import by.bycar.carservice.dto.create.AdvertisementCreateDTO;
import by.bycar.carservice.dto.response.AdvertisementResponseDTO;
import by.bycar.carservice.dto.update.AdvertisementUpdateDTO;
import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.mapper.AdMapper;
import by.bycar.carservice.model.*;
import by.bycar.carservice.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdvertisementServiceTest {

    @Mock
    private AdvertisementRepository advertisementRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelRepository modelRepository;

    @Mock
    private FeatureRepository featureRepository;

    @Mock
    private AdvertisementIndex advertisementIndex;

    @Mock
    private AdMapper adMapper;

    @Mock
    private ViewCounterService viewCounterService;

    @InjectMocks
    private AdvertisementService advertisementService;

    @Test
    void getAdvertisements_ShouldQueryDatabaseWithFilters() {
        String brand = "Toyota";
        Double minPrice = 9000.0;
        Double maxPrice = 15000.0;
        Integer minYear = 2018;
        Integer maxYear = 2022;
        Pageable pageable = PageRequest.of(0, 10);
        Advertisement ad = new Advertisement();
        ad.setId(1L);
        Page<Advertisement> dbPage = new PageImpl<>(List.of(ad));
        AdvertisementResponseDTO responseDTO = AdvertisementResponseDTO.builder().id(1L).build();

        when(advertisementRepository.findAllByFilters(brand, minPrice, maxPrice, minYear, maxYear, pageable)).thenReturn(dbPage);
        when(adMapper.toResponseDTO(ad)).thenReturn(responseDTO);

        Page<AdvertisementResponseDTO> result = advertisementService.getAdvertisements(
                brand, minPrice, maxPrice, minYear, maxYear, pageable
        );

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(advertisementRepository).findAllByFilters(brand, minPrice, maxPrice, minYear, maxYear, pageable);
        verify(advertisementIndex, never()).put(any(), any());
    }

    @Test
    void getAdvertisementsNative_ShouldReturnFromCache_WhenCacheContainsData() {
        String brand = "Honda";
        Double price = 15000.0;
        Pageable pageable = PageRequest.of(0, 10);
        SearchCriteria key = new SearchCriteria(brand, price, 0, 10);
        Page<AdvertisementResponseDTO> cachedPage = Page.empty();

        when(advertisementIndex.contains(key)).thenReturn(true);
        when(advertisementIndex.get(key)).thenReturn(cachedPage);

        Page<AdvertisementResponseDTO> result = advertisementService.getAdvertisementsNative(brand, price, pageable);

        assertNotNull(result);
        verify(advertisementIndex).contains(key);
        verify(advertisementIndex).get(key);
        verify(advertisementRepository, never()).findByBrandAndPriceNative(any(), any(), any());
    }

    @Test
    void getAdvertisementsNative_ShouldQueryDatabase_WhenCacheIsEmpty() {
        String brand = "Honda";
        Double price = 15000.0;
        Pageable pageable = PageRequest.of(0, 10);
        SearchCriteria key = new SearchCriteria(brand, price, 0, 10);
        Advertisement ad = new Advertisement();
        ad.setId(1L);
        Page<Advertisement> dbPage = new PageImpl<>(List.of(ad));
        AdvertisementResponseDTO responseDTO = AdvertisementResponseDTO.builder()
                .id(1L)
                .description("Description")
                .price(15000.0)
                .sellerName("Jane")
                .sellerPhone("+987654")
                .car(null)
                .build();

        when(advertisementIndex.contains(key)).thenReturn(false);
        when(advertisementRepository.findByBrandAndPriceNative(brand, price, pageable)).thenReturn(dbPage);
        when(adMapper.toResponseDTO(ad)).thenReturn(responseDTO);

        Page<AdvertisementResponseDTO> result = advertisementService.getAdvertisementsNative(brand, price, pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(advertisementRepository).findByBrandAndPriceNative(brand, price, pageable);
        verify(advertisementIndex).put(eq(key), any());
    }

    @Test
    void create_ShouldReturnAdvertisementResponseDTO() {
        AdvertisementCreateDTO createDTO = new AdvertisementCreateDTO(
                "Great car",
                "Description text",
                10000.0,
                "Minsk",
                "Minsk region",
                "John",
                true,
                true,
                false,
                1L,
                1L,
                2020,
                50000,
                "VIN12345678901234",
                List.of(1L, 2L),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        );
        Advertisement ad = new Advertisement();
        User user = new User();
        user.setId(1L);
        Model model = new Model();
        model.setId(1L);
        Feature feature1 = new Feature();
        feature1.setId(1L);
        Feature feature2 = new Feature();
        feature2.setId(2L);
        Advertisement savedAd = new Advertisement();
        savedAd.setId(1L);
        AdvertisementResponseDTO responseDTO = AdvertisementResponseDTO.builder()
                .id(1L)
                .description("Description text")
                .price(10000.0)
                .sellerName("John")
                .sellerPhone("+123456")
                .car(null)
                .build();

        when(adMapper.toEntity(createDTO)).thenReturn(ad);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(modelRepository.findById(1L)).thenReturn(Optional.of(model));
        when(featureRepository.findAllById(List.of(1L, 2L))).thenReturn(List.of(feature1, feature2));
        when(advertisementRepository.save(ad)).thenReturn(savedAd);
        when(adMapper.toResponseDTO(savedAd)).thenReturn(responseDTO);

        AdvertisementResponseDTO result = advertisementService.create(createDTO);

        assertNotNull(result);
        assertEquals(1L, result.id());
        verify(advertisementRepository).save(ad);
        verify(advertisementIndex).clear();
    }

    @Test
    void create_ShouldThrowException_WhenUserNotFound() {
        AdvertisementCreateDTO createDTO = new AdvertisementCreateDTO(
                "Great car",
                "Description text",
                10000.0,
                null,
                null,
                null,
                null,
                null,
                null,
                1L,
                1L,
                2020,
                50000,
                "VIN12345678901234",
                List.of(1L),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        );
        Advertisement ad = new Advertisement();

        when(adMapper.toEntity(createDTO)).thenReturn(ad);
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(CarServiceException.class, () -> advertisementService.create(createDTO));
        verify(advertisementRepository, never()).save(any());
    }

    @Test
    void create_ShouldThrowException_WhenModelNotFound() {
        AdvertisementCreateDTO createDTO = new AdvertisementCreateDTO(
                "Great car",
                "Description text",
                10000.0,
                null,
                null,
                null,
                null,
                null,
                null,
                1L,
                1L,
                2020,
                50000,
                "VIN12345678901234",
                List.of(1L),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        );
        Advertisement ad = new Advertisement();
        User user = new User();

        when(adMapper.toEntity(createDTO)).thenReturn(ad);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(modelRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(CarServiceException.class, () -> advertisementService.create(createDTO));
        verify(advertisementRepository, never()).save(any());
    }

    @Test
    void update_ShouldReturnUpdatedAdvertisement() {
        Long id = 1L;
        AdvertisementUpdateDTO updateDTO = new AdvertisementUpdateDTO("Updated Description", 12000.0, null, null, null, null, null);
        Advertisement ad = new Advertisement();
        ad.setId(id);
        Car car = new Car();
        ad.setCar(car);
        Advertisement savedAd = new Advertisement();
        savedAd.setId(id);
        AdvertisementResponseDTO responseDTO = AdvertisementResponseDTO.builder()
                .id(id)
                .description("Updated Description")
                .price(12000.0)
                .sellerName("John")
                .sellerPhone("+123456")
                .car(null)
                .build();

        when(advertisementRepository.findById(id)).thenReturn(Optional.of(ad));
        when(advertisementRepository.save(ad)).thenReturn(savedAd);
        when(adMapper.toResponseDTO(savedAd)).thenReturn(responseDTO);

        AdvertisementResponseDTO result = advertisementService.update(id, updateDTO);

        assertNotNull(result);
        assertEquals("Updated Description", result.description());
        verify(adMapper).updateEntityFromDto(updateDTO, ad);
        verify(advertisementRepository).save(ad);
        verify(advertisementIndex).clear();
    }

    @Test
    void update_WithModelId_ShouldUpdateCarModel() {
        Long id = 1L;
        Long modelId = 2L;
        AdvertisementUpdateDTO updateDTO = new AdvertisementUpdateDTO(null, null, modelId, null, null, null, null);
        Advertisement ad = new Advertisement();
        Car car = new Car();
        ad.setCar(car);
        Model model = new Model();
        model.setId(modelId);

        when(advertisementRepository.findById(id)).thenReturn(Optional.of(ad));
        when(modelRepository.findById(modelId)).thenReturn(Optional.of(model));
        when(advertisementRepository.save(ad)).thenReturn(ad);
        when(adMapper.toResponseDTO(ad)).thenReturn(AdvertisementResponseDTO.builder()
                .id(id)
                .description("Description")
                .price(10000.0)
                .sellerName("John")
                .sellerPhone("+123456")
                .car(null)
                .build());

        AdvertisementResponseDTO result = advertisementService.update(id, updateDTO);

        assertNotNull(result);
        verify(modelRepository).findById(modelId);
    }

    @Test
    void update_WithFeatureIds_ShouldUpdateCarFeatures() {
        Long id = 1L;
        List<Long> featureIds = List.of(1L, 2L);
        AdvertisementUpdateDTO updateDTO = new AdvertisementUpdateDTO(null, null, null, null, null, null, featureIds);
        Advertisement ad = new Advertisement();
        Car car = new Car();
        ad.setCar(car);
        Feature feature1 = new Feature();
        Feature feature2 = new Feature();

        when(advertisementRepository.findById(id)).thenReturn(Optional.of(ad));
        when(featureRepository.findAllById(featureIds)).thenReturn(List.of(feature1, feature2));
        when(advertisementRepository.save(ad)).thenReturn(ad);
        when(adMapper.toResponseDTO(ad)).thenReturn(AdvertisementResponseDTO.builder()
                .id(id)
                .description("Description")
                .price(10000.0)
                .sellerName("John")
                .sellerPhone("+123456")
                .car(null)
                .build());

        AdvertisementResponseDTO result = advertisementService.update(id, updateDTO);

        assertNotNull(result);
        verify(featureRepository).findAllById(featureIds);
    }

    @Test
    void update_ShouldThrowException_WhenAdvertisementNotFound() {
        Long id = 1L;
        AdvertisementUpdateDTO updateDTO = new AdvertisementUpdateDTO("Description", 10000.0, null, null, null, null, null);

        when(advertisementRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(CarServiceException.class, () -> advertisementService.update(id, updateDTO));
        verify(advertisementRepository, never()).save(any());
    }

    @Test
    void findAll_ShouldReturnListOfAdvertisements() {
        Advertisement ad1 = new Advertisement();
        ad1.setId(1L);
        Advertisement ad2 = new Advertisement();
        ad2.setId(2L);

        when(advertisementRepository.findAll()).thenReturn(List.of(ad1, ad2));
        when(adMapper.toResponseDTO(ad1)).thenReturn(AdvertisementResponseDTO.builder()
                .id(1L)
                .description("Desc1")
                .price(10000.0)
                .sellerName("John")
                .sellerPhone("+123456")
                .car(null)
                .build());
        when(adMapper.toResponseDTO(ad2)).thenReturn(AdvertisementResponseDTO.builder()
                .id(2L)
                .description("Desc2")
                .price(15000.0)
                .sellerName("Jane")
                .sellerPhone("+987654")
                .car(null)
                .build());

        List<AdvertisementResponseDTO> result = advertisementService.findAll();

        assertEquals(2, result.size());
        verify(advertisementRepository).findAll();
    }

    @Test
    void findById_ShouldReturnAdvertisement() {
        Long id = 1L;
        Advertisement ad = new Advertisement();
        ad.setId(id);
        ad.setViewsCount(10L);
        AdvertisementResponseDTO responseDTO = AdvertisementResponseDTO.builder()
                .id(id)
                .description("Description")
                .price(10000.0)
                .sellerName("John")
                .sellerPhone("+123456")
                .car(null)
                .build();

        when(advertisementRepository.findById(id)).thenReturn(Optional.of(ad));
        when(advertisementRepository.save(ad)).thenReturn(ad);
        when(adMapper.toResponseDTO(ad)).thenReturn(responseDTO);

        AdvertisementResponseDTO result = advertisementService.findById(id);

        assertNotNull(result);
        assertEquals(id, result.id());
        verify(advertisementRepository).findById(id);
        verify(advertisementRepository).save(ad);
        verify(viewCounterService).incrementViewsAtomic(id);
    }

    @Test
    void findById_ShouldThrowException_WhenNotFound() {
        Long id = 1L;

        when(advertisementRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(CarServiceException.class, () -> advertisementService.findById(id));
    }

    @Test
    void findByYear_ShouldReturnAdvertisementsByYear() {
        Integer year = 2020;
        Advertisement ad1 = new Advertisement();
        ad1.setId(1L);

        when(advertisementRepository.findAllByCarYear(year)).thenReturn(List.of(ad1));
        when(adMapper.toResponseDTO(ad1)).thenReturn(AdvertisementResponseDTO.builder()
                .id(1L)
                .description("Description")
                .price(10000.0)
                .sellerName("John")
                .sellerPhone("+123456")
                .car(null)
                .build());

        List<AdvertisementResponseDTO> result = advertisementService.findByYear(year);

        assertEquals(1, result.size());
        verify(advertisementRepository).findAllByCarYear(year);
    }

    @Test
    void deleteAd_ShouldDeleteAdvertisement() {
        Long id = 1L;

        when(advertisementRepository.existsById(id)).thenReturn(true);

        advertisementService.deleteAd(id);

        verify(advertisementRepository).deleteById(id);
        verify(advertisementIndex).clear();
    }

    @Test
    void deleteAd_ShouldThrowException_WhenNotFound() {
        Long id = 1L;

        when(advertisementRepository.existsById(id)).thenReturn(false);

        assertThrows(CarServiceException.class, () -> advertisementService.deleteAd(id));
        verify(advertisementRepository, never()).deleteById(any());
    }

    @Test
    void update_WithYear_ShouldUpdateCarYear() {
        Long id = 1L;
        Integer year = 2021;
        AdvertisementUpdateDTO updateDTO = new AdvertisementUpdateDTO(null, null, null, year, null, null, null);
        Advertisement ad = new Advertisement();
        Car car = new Car();
        ad.setCar(car);

        when(advertisementRepository.findById(id)).thenReturn(Optional.of(ad));
        when(advertisementRepository.save(ad)).thenReturn(ad);
        when(adMapper.toResponseDTO(ad)).thenReturn(AdvertisementResponseDTO.builder()
                .id(id)
                .description("Description")
                .price(10000.0)
                .sellerName("John")
                .sellerPhone("+123456")
                .car(null)
                .build());

        AdvertisementResponseDTO result = advertisementService.update(id, updateDTO);

        assertNotNull(result);
        assertEquals(year, car.getYear());
    }

    @Test
    void update_WithMileage_ShouldUpdateCarMileage() {
        Long id = 1L;
        Integer mileage = 60000;
        AdvertisementUpdateDTO updateDTO = new AdvertisementUpdateDTO(null, null, null, null, mileage, null, null);
        Advertisement ad = new Advertisement();
        Car car = new Car();
        ad.setCar(car);

        when(advertisementRepository.findById(id)).thenReturn(Optional.of(ad));
        when(advertisementRepository.save(ad)).thenReturn(ad);
        when(adMapper.toResponseDTO(ad)).thenReturn(AdvertisementResponseDTO.builder()
                .id(id)
                .description("Description")
                .price(10000.0)
                .sellerName("John")
                .sellerPhone("+123456")
                .car(null)
                .build());

        AdvertisementResponseDTO result = advertisementService.update(id, updateDTO);

        assertNotNull(result);
        assertEquals(mileage, car.getMileage());
    }

    @Test
    void update_WithVin_ShouldUpdateCarVin() {
        Long id = 1L;
        String vin = "NEWVIN12345678901";
        AdvertisementUpdateDTO updateDTO = new AdvertisementUpdateDTO(null, null, null, null, null, vin, null);
        Advertisement ad = new Advertisement();
        Car car = new Car();
        ad.setCar(car);

        when(advertisementRepository.findById(id)).thenReturn(Optional.of(ad));
        when(advertisementRepository.save(ad)).thenReturn(ad);
        when(adMapper.toResponseDTO(ad)).thenReturn(AdvertisementResponseDTO.builder()
                .id(id)
                .description("Description")
                .price(10000.0)
                .sellerName("John")
                .sellerPhone("+123456")
                .car(null)
                .build());

        AdvertisementResponseDTO result = advertisementService.update(id, updateDTO);

        assertNotNull(result);
        assertEquals(vin, car.getVin());
    }
}