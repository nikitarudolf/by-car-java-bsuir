package by.bycar.car_service.controller;

import by.bycar.car_service.dto.create.AdvertisementCreateDTO;
import by.bycar.car_service.dto.response.AdvertisementResponseDTO;
import by.bycar.car_service.dto.update.AdvertisementUpdateDTO;
import by.bycar.car_service.service.AdvertisementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping ("/createnotx")
    public AdvertisementResponseDTO createAdNoTX(@RequestBody AdvertisementCreateDTO ad) {
        return advertisementService.createNoTX(ad);
    }

    @DeleteMapping("/{id}")
    public void deleteAd(@PathVariable Long id) {
        advertisementService.deleteAd(id);
    }

    @PatchMapping("/{id}")
    public void editAd(@RequestBody AdvertisementUpdateDTO ad, @PathVariable Long id) {
        advertisementService.update(ad, id);
    }

    @GetMapping("/badfind")
    public List<AdvertisementResponseDTO> findAllBad() {
        return advertisementService.findAllBad();
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
