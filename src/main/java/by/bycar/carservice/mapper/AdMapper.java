package by.bycar.carservice.mapper;

import by.bycar.carservice.dto.create.AdvertisementCreateDTO;
import by.bycar.carservice.dto.response.AdvertisementResponseDTO;
import by.bycar.carservice.dto.update.AdvertisementUpdateDTO;
import by.bycar.carservice.exception.TestException;
import by.bycar.carservice.model.Advertisement;
import by.bycar.carservice.model.Car;
import by.bycar.carservice.repository.FeatureRepository;
import by.bycar.carservice.repository.ModelRepository;
import by.bycar.carservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
@RequiredArgsConstructor
public class AdMapper {
    private final UserRepository users;
    private final FeatureRepository featureRepository;
    private final ModelRepository modelRepository;
    private final CarMapper carMapper;

    public Advertisement toEntity(AdvertisementCreateDTO advertisementCreateDTO) {
        return Advertisement.builder()
                .description(advertisementCreateDTO.description())
                .user(users.findById(advertisementCreateDTO.userId()).orElseThrow())
                .car(Car.builder()
                        .vin(advertisementCreateDTO.vin())
                        .mileage(advertisementCreateDTO.mileage())
                        .year(advertisementCreateDTO.year())
                        .model(modelRepository.findById(advertisementCreateDTO.modelId()).orElseThrow())
                        .features(new HashSet<>(featureRepository
                                .findAllById(advertisementCreateDTO
                                        .featureIds())))
                        .build())
                .price(advertisementCreateDTO.price())
                .build();
    }

    public void toEntity(Advertisement advertisement, AdvertisementUpdateDTO advertisementUpdateDTO) {
        advertisement.setPrice(advertisementUpdateDTO.price());
        advertisement.setDescription(advertisement.getDescription());
        advertisement
                .getCar()
                .setModel(modelRepository
                        .findById(advertisementUpdateDTO
                                .modelId())
                        .orElseThrow(() -> new TestException("s")));
        advertisement.getCar().setYear(advertisementUpdateDTO.year());
        advertisement.getCar().setMileage(advertisementUpdateDTO.mileage());
        advertisement.getCar().setVin(advertisementUpdateDTO.vin());
        advertisement.getCar().setFeatures(new HashSet<>(featureRepository
                .findAllById(advertisementUpdateDTO
                        .featureIds())));
    }

    public AdvertisementResponseDTO toDTO(Advertisement advertisement) {
        return AdvertisementResponseDTO.builder()
                .id(advertisement.getId())
                .description(advertisement.getDescription())
                .price(advertisement.getPrice())
                .sellerName(advertisement.getUser().getName())
                .sellerPhone(advertisement.getUser().getPhone())
                .car(carMapper.toDTO(advertisement.getCar()))
                .build();
    }

}
