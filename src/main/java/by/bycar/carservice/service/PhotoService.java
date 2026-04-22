package by.bycar.carservice.service;

import by.bycar.carservice.dto.PhotoDto;
import by.bycar.carservice.model.Advertisement;
import by.bycar.carservice.model.Photo;
import by.bycar.carservice.repository.AdvertisementRepository;
import by.bycar.carservice.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final AdvertisementRepository advertisementRepository;

    @Transactional
    public PhotoDto addPhoto(Long advertisementId, PhotoDto photoDto) {
        Advertisement advertisement = advertisementRepository.findById(advertisementId)
                .orElseThrow(() -> new RuntimeException("Advertisement not found"));

        Photo photo = Photo.builder()
                .url(photoDto.getUrl())
                .orderIndex(photoDto.getOrderIndex())
                .isMain(photoDto.getIsMain())
                .advertisement(advertisement)
                .build();

        Photo saved = photoRepository.save(photo);
        return toDto(saved);
    }

    @Transactional(readOnly = true)
    public List<PhotoDto> getPhotosByAdvertisement(Long advertisementId) {
        return photoRepository.findByAdvertisementIdOrderByOrderIndexAsc(advertisementId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deletePhoto(Long photoId) {
        photoRepository.deleteById(photoId);
    }

    @Transactional
    public PhotoDto updatePhotoOrder(Long photoId, Integer newOrder) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new RuntimeException("Photo not found"));
        photo.setOrderIndex(newOrder);
        Photo updated = photoRepository.save(photo);
        return toDto(updated);
    }

    @Transactional
    public PhotoDto setMainPhoto(Long photoId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new RuntimeException("Photo not found"));

        List<Photo> allPhotos = photoRepository.findByAdvertisementIdOrderByOrderIndexAsc(
                photo.getAdvertisement().getId());
        allPhotos.forEach(p -> p.setIsMain(false));
        photoRepository.saveAll(allPhotos);

        photo.setIsMain(true);
        Photo updated = photoRepository.save(photo);
        return toDto(updated);
    }

    private PhotoDto toDto(Photo photo) {
        return PhotoDto.builder()
                .id(photo.getId())
                .url(photo.getUrl())
                .orderIndex(photo.getOrderIndex())
                .isMain(photo.getIsMain())
                .build();
    }
}
