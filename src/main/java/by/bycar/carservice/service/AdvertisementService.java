package by.bycar.carservice.service;

import by.bycar.carservice.cache.AdvertisementIndex;
import by.bycar.carservice.dto.create.AdvertisementCreateDTO;
import by.bycar.carservice.dto.response.AdvertisementResponseDTO;
import by.bycar.carservice.dto.update.AdvertisementUpdateDTO;
import by.bycar.carservice.exception.TestException;
import by.bycar.carservice.mapper.AdMapper;
import by.bycar.carservice.model.Advertisement;
import by.bycar.carservice.repository.AdvertisementRepository;
import by.bycar.carservice.dto.SearchCriteria;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Slf4j
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final AdvertisementIndex advertisementIndex;
    private final AdMapper adMapper;

    public Page<AdvertisementResponseDTO> getAdvertisements(String brand, Double price, Pageable pageable) {
        SearchCriteria key = new SearchCriteria(brand, price, pageable.getPageNumber(), pageable.getPageSize());

        if (advertisementIndex.contains(key)) {
            log.info("Данные получены из КЭША для бренда: {} и цены: {}", brand, price);
            return advertisementIndex.get(key);
        }

        log.info("Запрос к БАЗЕ ДАННЫХ: бренд={}, макс. цена={}", brand, price);
        Page<AdvertisementResponseDTO> result = advertisementRepository.findAllByBrandAndPriceJPQL(brand, price, pageable)
                .map(adMapper::toDTO);

        advertisementIndex.put(key, result);
        return result;
    }

    public Page<AdvertisementResponseDTO> getAdvertisementsNative(String brand, Double price, Pageable pageable) {
        SearchCriteria key = new SearchCriteria(brand, price, pageable.getPageNumber(), pageable.getPageSize());

        if (advertisementIndex.contains(key)) {
            log.info("Данные получены из КЭША для бренда: {} и цены: {}", brand, price);
            return advertisementIndex.get(key);
        }

        log.info("Запрос к БАЗЕ ДАННЫХ: бренд={}, макс. цена={}", brand, price);
        Page<AdvertisementResponseDTO> result = advertisementRepository.findByBrandAndPriceNative(brand, price, pageable)
                .map(adMapper::toDTO);

        advertisementIndex.put(key, result);
        return result;
    }

    @Transactional
    public AdvertisementResponseDTO create(AdvertisementCreateDTO advertisementCreateDTO) {
        Advertisement advertisement = adMapper.toEntity(advertisementCreateDTO);
        Advertisement savedAd = advertisementRepository.save(advertisement);
        advertisementIndex.clear();
        return adMapper.toDTO(savedAd);
    }

    @Transactional
    public AdvertisementResponseDTO update(AdvertisementUpdateDTO advertisementUpdateDTO, Long id) {
        Advertisement advertisement = advertisementRepository
                .findById(id)
                .orElseThrow(() -> new TestException("Not found"));
        adMapper.toEntity(advertisement, advertisementUpdateDTO);
        Advertisement savedAd = advertisementRepository.save(advertisement);
        return adMapper.toDTO(savedAd);
    }

    public List<AdvertisementResponseDTO> findAll() {
        return advertisementRepository.findAll()
                .stream()
                .map(adMapper::toDTO).toList();
    }


    public AdvertisementResponseDTO findById(Long id) {
        return advertisementRepository.findById(id)
                .map(adMapper::toDTO)
                .orElseThrow();
    }

    public List<AdvertisementResponseDTO> findByYear(Integer year) {
        return advertisementRepository.findAllByCarYear(year)
                .stream()
                .map(adMapper::toDTO)
                .toList();
    }

    @Transactional
    public void deleteAd(Long id) {
        advertisementRepository.deleteById(id);
    }
}