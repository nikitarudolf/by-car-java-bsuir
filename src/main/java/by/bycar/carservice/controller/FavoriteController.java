package by.bycar.carservice.controller;

import by.bycar.carservice.dto.FavoriteDto;
import by.bycar.carservice.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;

    @PostMapping
    public ResponseEntity<FavoriteDto> addToFavorites(
            @RequestParam Long userId,
            @RequestParam Long advertisementId) {
        return ResponseEntity.ok(favoriteService.addToFavorites(userId, advertisementId));
    }

    @DeleteMapping
    public ResponseEntity<Void> removeFromFavorites(
            @RequestParam Long userId,
            @RequestParam Long advertisementId) {
        favoriteService.removeFromFavorites(userId, advertisementId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FavoriteDto>> getUserFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteService.getUserFavorites(userId));
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isFavorite(
            @RequestParam Long userId,
            @RequestParam Long advertisementId) {
        return ResponseEntity.ok(favoriteService.isFavorite(userId, advertisementId));
    }
}
