package by.bycar.carservice.service;

import by.bycar.carservice.dto.FavoriteDto;
import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.model.Advertisement;
import by.bycar.carservice.model.Favorite;
import by.bycar.carservice.model.User;
import by.bycar.carservice.repository.AdvertisementRepository;
import by.bycar.carservice.repository.FavoriteRepository;
import by.bycar.carservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final AdvertisementRepository advertisementRepository;

    @Transactional
    public FavoriteDto addToFavorites(Long userId, Long advertisementId) {
        if (favoriteRepository.existsByUserIdAndAdvertisementId(userId, advertisementId)) {
            throw new CarServiceException("Already in favorites");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Advertisement advertisement = advertisementRepository.findById(advertisementId)
                .orElseThrow(() -> new RuntimeException("Advertisement not found"));

        Favorite favorite = Favorite.builder()
                .user(user)
                .advertisement(advertisement)
                .build();

        Favorite saved = favoriteRepository.save(favorite);
        return toDto(saved);
    }

    @Transactional
    public void removeFromFavorites(Long userId, Long advertisementId) {
        favoriteRepository.deleteByUserIdAndAdvertisementId(userId, advertisementId);
    }

    @Transactional(readOnly = true)
    public List<FavoriteDto> getUserFavorites(Long userId) {
        return favoriteRepository.findByUserId(userId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public boolean isFavorite(Long userId, Long advertisementId) {
        return favoriteRepository.existsByUserIdAndAdvertisementId(userId, advertisementId);
    }

    private FavoriteDto toDto(Favorite favorite) {
        return FavoriteDto.builder()
                .id(favorite.getId())
                .addedAt(favorite.getAddedAt())
                .userId(favorite.getUser().getId())
                .advertisementId(favorite.getAdvertisement().getId())
                .build();
    }
}
