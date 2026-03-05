package by.bycar.car_service.service;

import by.bycar.car_service.dto.create.AdvertisementCreateDTO;
import by.bycar.car_service.dto.response.AdvertisementResponseDTO;
import by.bycar.car_service.dto.update.AdvertisementUpdateDTO;
import by.bycar.car_service.exception.TestException;
import by.bycar.car_service.mapper.AdMapper;
import by.bycar.car_service.model.Advertisement;
import by.bycar.car_service.repository.AdvertisementRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final AdMapper adMapper;



    public AdvertisementResponseDTO createNoTX(AdvertisementCreateDTO advertisementCreateDTO) {
        Advertisement advertisement = adMapper.toEntity(advertisementCreateDTO);
        Advertisement savedAd = advertisementRepository.saveAndFlush(advertisement);
        if (true) {
            throw new TestException("test");
        }
        return adMapper.toDTO(savedAd);
    }
    @Transactional
    public AdvertisementResponseDTO create(AdvertisementCreateDTO advertisementCreateDTO) {
        Advertisement advertisement = adMapper.toEntity(advertisementCreateDTO);
        Advertisement savedAd = advertisementRepository.save(advertisement);
        if (true) {
            throw new TestException("test");
        }
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

    public List<AdvertisementResponseDTO> findAllBad() {
        return advertisementRepository.findAllBad()
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