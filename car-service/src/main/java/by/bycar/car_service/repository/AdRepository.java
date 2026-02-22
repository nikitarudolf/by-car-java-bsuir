package by.bycar.car_service.repository;

import by.bycar.car_service.model.Advertisement;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class AdRepository {

    private final List<Advertisement> ads = new ArrayList<>();

    public AdRepository() {
        save(new Advertisement(1L, "BMW", "X5", 2020, 55000.0));
        save(new Advertisement(2L, "Audi", "A6", 2019, 42000.0));
        save(new Advertisement(3L, "Tesla", "Model 3", 2021, 38000.0));
    }

    public List<Advertisement> findAll() {
        return new ArrayList<>(ads); // Возвращаем копию списка
    }

    public Optional<Advertisement> findById(Long id) {
        return ads.stream()
                .filter(ad -> ad.getId() == id)
                .findFirst();
    }

    public Advertisement save(Advertisement ad) {
        ads.add(ad);
        return ad;
    }

    public void deleteById(Long id) {
        ads.removeIf(ad -> ad.getId() == id);
    }
}