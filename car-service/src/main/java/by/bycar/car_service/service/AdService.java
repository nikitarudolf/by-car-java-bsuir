package by.bycar.car_service.service;

import by.bycar.car_service.dto.AdDTO;
import by.bycar.car_service.mapper.AdMapper;
import by.bycar.car_service.model.Advertisement;
import by.bycar.car_service.repository.AdRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdService {
    private final AdRepository adRepository;

    private final AdMapper adMapper; // Добавляем маппер

    public AdService(AdRepository adRepository, AdMapper adMapper) {
        this.adRepository = adRepository;
        this.adMapper = adMapper;
    }

    // Возвращаем список DTO
    public List<AdDTO> getAllAds() {
        return adRepository.findAll().stream()
                .map(adMapper::toDTO) // Превращаем каждое объявление в DTO
                .collect(Collectors.toList());
    }

    // Возвращаем один DTO
    public AdDTO getAdById(Long id) {
        return adRepository.findById(id)
                .map(adMapper::toDTO)
                .orElse(null);
    }

    public List<AdDTO> getAdsByBrand(String brand) {
        return adRepository.findAll().stream()
                .filter(ad -> ad.getBrand().equalsIgnoreCase(brand))
                .map(adMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Принимаем DTO от контроллера, сохраняем Entity
    public AdDTO createAd(AdDTO adDTO) {
        Advertisement adEntity = adMapper.toEntity(adDTO);
        Advertisement savedAd = adRepository.save(adEntity);
        return adMapper.toDTO(savedAd);
    }

    public void deleteAd(Long id) {
        adRepository.deleteById(id);
    }
}