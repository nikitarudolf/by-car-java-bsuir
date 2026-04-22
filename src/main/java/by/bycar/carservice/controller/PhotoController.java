package by.bycar.carservice.controller;

import by.bycar.carservice.dto.PhotoDto;
import by.bycar.carservice.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/photos")
@RequiredArgsConstructor
public class PhotoController {
    private final PhotoService photoService;

    @PostMapping("/advertisement/{advertisementId}")
    public ResponseEntity<PhotoDto> addPhoto(
            @PathVariable Long advertisementId,
            @RequestBody PhotoDto photoDto) {
        return ResponseEntity.ok(photoService.addPhoto(advertisementId, photoDto));
    }

    @GetMapping("/advertisement/{advertisementId}")
    public ResponseEntity<List<PhotoDto>> getPhotos(@PathVariable Long advertisementId) {
        return ResponseEntity.ok(photoService.getPhotosByAdvertisement(advertisementId));
    }

    @DeleteMapping("/{photoId}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long photoId) {
        photoService.deletePhoto(photoId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{photoId}/order")
    public ResponseEntity<PhotoDto> updateOrder(
            @PathVariable Long photoId,
            @RequestParam Integer orderIndex) {
        return ResponseEntity.ok(photoService.updatePhotoOrder(photoId, orderIndex));
    }

    @PutMapping("/{photoId}/set-main")
    public ResponseEntity<PhotoDto> setMainPhoto(@PathVariable Long photoId) {
        return ResponseEntity.ok(photoService.setMainPhoto(photoId));
    }
}
