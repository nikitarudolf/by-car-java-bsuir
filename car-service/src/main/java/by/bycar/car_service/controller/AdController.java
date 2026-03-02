package by.bycar.car_service.controller;

import by.bycar.car_service.dto.create.AdvertisementCreateDTO;
import by.bycar.car_service.dto.response.AdvertisementResponseDTO;
import by.bycar.car_service.service.AdvertisementService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping
    public List<AdvertisementResponseDTO> findAll() {
        return advertisementService.findAll();
    }

    @GetMapping("/find")
    public List<AdvertisementResponseDTO> findByYear(@RequestParam("year") Integer year) {
        return advertisementService.findByYear(year);
    }
}
