package by.bycar.carservice.controller;

import by.bycar.carservice.dto.create.AdvertisementCreateDTO;
import by.bycar.carservice.dto.response.AdvertisementResponseDTO;
import by.bycar.carservice.dto.update.AdvertisementUpdateDTO;
import by.bycar.carservice.service.AdvertisementService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
public class AdController {
    private final AdvertisementService advertisementService;

    @GetMapping("/{id:\\d+}")
    public AdvertisementResponseDTO findById(@PathVariable Long id) {
        return advertisementService.findById(id);
    }

    @PostMapping
    public AdvertisementResponseDTO createAd(@RequestBody AdvertisementCreateDTO ad) {
        return advertisementService.create(ad);
    }

    @DeleteMapping("/{id}")
    public void deleteAd(@PathVariable Long id) {
        advertisementService.deleteAd(id);
    }

    @PatchMapping("/{id}")
    public void editAd(@RequestBody AdvertisementUpdateDTO ad, @PathVariable Long id) {
        advertisementService.update(ad, id);
    }

    @GetMapping
    public List<AdvertisementResponseDTO> findAll() {
        return advertisementService.findAll();
    }

    @GetMapping("/find")
    public List<AdvertisementResponseDTO> findByYear(@RequestParam("year") Integer year) {
        return advertisementService.findByYear(year);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<AdvertisementResponseDTO>> search(
            @RequestParam String brand,
            @RequestParam Double maxPrice, Pageable pageable) {

        return ResponseEntity.ok(advertisementService.getAdvertisements(brand, maxPrice, pageable));
    }

    @GetMapping("/searchNative")
    public ResponseEntity<Page<AdvertisementResponseDTO>> searchNative(
            @RequestParam String brand,
            @RequestParam Double maxPrice, Pageable pageable) {

        return ResponseEntity.ok(advertisementService.getAdvertisementsNative(brand, maxPrice, pageable));
    }


}
