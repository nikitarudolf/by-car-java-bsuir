package by.bycar.car_service.controller;

import by.bycar.car_service.dto.AdDTO;
import by.bycar.car_service.service.AdService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ads")
public class AdController {
    private final AdService adService;

    public AdController(AdService adService) {
        this.adService = adService;
    }

    @GetMapping("/{id}")
    public AdDTO getById(@PathVariable Long id) {
        return adService.getAdById(id);
    }

    @PostMapping
    public AdDTO createAd(@RequestBody AdDTO ad) {
        return adService.createAd(ad);
    }

    @DeleteMapping("/{id}")
    public void deleteAd(@PathVariable Long id) {
        adService.deleteAd(id);
    }

    @GetMapping
    public List<AdDTO> getAllAds() {
        return adService.getAllAds();
    }

    @GetMapping("/search")
    public List<AdDTO> searchByBrand(@RequestParam String brand) {
        return adService.getAdsByBrand(brand);
    }
}
