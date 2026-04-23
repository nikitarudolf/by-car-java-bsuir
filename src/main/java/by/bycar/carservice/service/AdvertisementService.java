package by.bycar.carservice.service;

import by.bycar.carservice.cache.AdvertisementIndex;
import by.bycar.carservice.concurrency.ViewCounterService;
import by.bycar.carservice.dto.SearchCriteria;
import by.bycar.carservice.dto.create.AdvertisementCreateDTO;
import by.bycar.carservice.dto.response.AdvertisementResponseDTO;
import by.bycar.carservice.dto.update.AdvertisementUpdateDTO;
import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.mapper.AdMapper;
import by.bycar.carservice.model.Advertisement;
import by.bycar.carservice.model.Car;
import by.bycar.carservice.repository.AdvertisementRepository;
import by.bycar.carservice.repository.FeatureRepository;
import by.bycar.carservice.repository.ModelRepository;
import by.bycar.carservice.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdvertisementService {

    private final AdvertisementRepository advertisementRepository;
    private final UserRepository userRepository;
    private final ModelRepository modelRepository;
    private final FeatureRepository featureRepository;
    private final AdvertisementIndex advertisementIndex;
    private final AdMapper adMapper;
    private final ViewCounterService viewCounterService;


    public Page<AdvertisementResponseDTO> getAdvertisements(String brand, Double minPrice, Double maxPrice, Integer minYear, Integer maxYear, Pageable pageable) {
        log.info("[DB] Запрос к БД (JPQL): бренд={}, minPrice={}, maxPrice={}, minYear={}, maxYear={}", brand, minPrice, maxPrice, minYear, maxYear);
        Page<AdvertisementResponseDTO> result = advertisementRepository
                .findAllByFilters(brand, minPrice, maxPrice, minYear, maxYear, pageable)
                .map(adMapper::toResponseDTO);

        return result;
    }

    public Page<AdvertisementResponseDTO> getAdvertisementsNative(String brand, Double price, Pageable pageable) {
        SearchCriteria key = new SearchCriteria(brand, price, pageable.getPageNumber(), pageable.getPageSize());

        if (advertisementIndex.contains(key)) {
            log.info("[CACHE] Данные получены из кэша (Native): бренд={}, цена={}", brand, price);
            return advertisementIndex.get(key);
        }

        log.info("[DB] Запрос к БД (Native): бренд={}, цена={}", brand, price);
        Page<AdvertisementResponseDTO> result = advertisementRepository
                .findByBrandAndPriceNative(brand, price, pageable)
                .map(adMapper::toResponseDTO);

        advertisementIndex.put(key, result);
        return result;
    }


    @Transactional
    public AdvertisementResponseDTO create(AdvertisementCreateDTO dto) {
        Advertisement ad = adMapper.toEntity(dto);

        ad.setUser(userRepository.findById(dto.userId())
                .orElseThrow(() -> new CarServiceException("User not found")));

        Car car = Car.builder()
                .vin(dto.vin())
                .mileage(dto.mileage())
                .year(dto.year())
                .model(modelRepository.findById(dto.modelId())
                        .orElseThrow(() -> new CarServiceException("Model not found")))
                .features(new HashSet<>(featureRepository.findAllById(dto.featureIds())))
                .engineType(dto.engineType())
                .engineVolume(dto.engineVolume())
                .enginePower(dto.enginePower())
                .transmissionType(dto.transmissionType())
                .driveType(dto.driveType())
                .bodyType(dto.bodyType())
                .color(dto.color())
                .doorsCount(dto.doorsCount())
                .fuelConsumption(dto.fuelConsumption())
                .condition(dto.condition())
                .isCustomsCleared(dto.isCustomsCleared())
                .build();

        ad.setCar(car);

        Advertisement savedAd = advertisementRepository.save(ad);
        advertisementIndex.clear();

        return adMapper.toResponseDTO(savedAd);
    }

    @Transactional
    public AdvertisementResponseDTO update(Long id, AdvertisementUpdateDTO dto) {
        Advertisement ad = advertisementRepository.findById(id)
                .orElseThrow(() -> new CarServiceException("Advertisement not found"));

        adMapper.updateEntityFromDto(dto, ad);

        Car car = ad.getCar();
        if (dto.modelId() != null) {
            car.setModel(modelRepository.findById(dto.modelId()).orElseThrow());
        }
        if (dto.year() != null) {
            car.setYear(dto.year());
        }
        if (dto.mileage() != null) {
            car.setMileage(dto.mileage());
        }
        if (dto.vin() != null) {
            car.setVin(dto.vin());
        }
        if (dto.featureIds() != null) {
            car.setFeatures(new HashSet<>(featureRepository.findAllById(dto.featureIds())));
        }

        Advertisement savedAd = advertisementRepository.save(ad);
        advertisementIndex.clear();

        return adMapper.toResponseDTO(savedAd);
    }

    public List<AdvertisementResponseDTO> findAll() {
        return advertisementRepository.findAll()
                .stream()
                .map(adMapper::toResponseDTO)
                .toList();
    }

    @Transactional
    public AdvertisementResponseDTO findById(Long id) {
        Advertisement ad = advertisementRepository.findById(id)
                .orElseThrow(() -> new CarServiceException("Ad with id " + id + " not found"));

        ad.setViewsCount(ad.getViewsCount() + 1);
        advertisementRepository.save(ad);

        viewCounterService.incrementViewsAtomic(id);

        return adMapper.toResponseDTO(ad);
    }

    public List<AdvertisementResponseDTO> findByYear(Integer year) {
        return advertisementRepository.findAllByCarYear(year)
                .stream()
                .map(adMapper::toResponseDTO)
                .toList();
    }

    public List<AdvertisementResponseDTO> findByUserId(Long userId) {
        return advertisementRepository.findAllByUserId(userId)
                .stream()
                .map(adMapper::toResponseDTO)
                .toList();
    }

    @Transactional
    public void deleteAd(Long id) {
        if (!advertisementRepository.existsById(id)) {
            throw new CarServiceException("Ad not found");
        }
        advertisementRepository.deleteById(id);
        advertisementIndex.clear();
    }
}