package by.bycar.carservice.cache;

import by.bycar.carservice.dto.SearchCriteria;
import by.bycar.carservice.dto.response.AdvertisementResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class AdvertisementIndex {

    private final Map<SearchCriteria, Page<AdvertisementResponseDTO>> store = new HashMap<>();

    public void put(SearchCriteria key, Page<AdvertisementResponseDTO> value) {
        store.put(key, value);
    }

    public Page<AdvertisementResponseDTO> get(SearchCriteria key) {
        return store.get(key);
    }

    public boolean contains(SearchCriteria key) {
        return store.containsKey(key);
    }

    public void clear() {
        store.clear();
        log.info("Кэш очищен");
    }
}