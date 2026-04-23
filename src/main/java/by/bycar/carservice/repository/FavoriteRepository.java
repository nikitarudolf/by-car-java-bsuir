package by.bycar.carservice.repository;

import by.bycar.carservice.model.Favorite;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @EntityGraph(attributePaths = {"advertisement", "advertisement.car", "advertisement.car.model", "advertisement.car.model.brand", "advertisement.car.features", "advertisement.user"})
    List<Favorite> findByUserId(Long userId);

    Optional<Favorite> findByUserIdAndAdvertisementId(Long userId, Long advertisementId);
    boolean existsByUserIdAndAdvertisementId(Long userId, Long advertisementId);
    void deleteByUserIdAndAdvertisementId(Long userId, Long advertisementId);
}
