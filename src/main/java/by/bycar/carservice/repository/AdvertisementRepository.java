package by.bycar.carservice.repository;

import by.bycar.carservice.model.Advertisement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {

    @EntityGraph(attributePaths = {"user", "car", "car.model", "car.features", "car.model.brand"})
    List<Advertisement> findAll();

    @Query("SELECT a FROM Advertisement a " + "JOIN a.car c "
            + "JOIN c.model m " + "JOIN m.brand b " + "WHERE b.name = :brandName AND a.price <= :maxPrice ")
    Page<Advertisement> findAllByBrandAndPriceJPQL(String brandName, Double maxPrice, Pageable pageable);

    @Query(value = "SELECT a.* FROM advertisement a " + "JOIN cars c ON a.car_id = c.id " + "JOIN models m ON c.model_id = m.id " + "JOIN brands b ON m.brand_id = b.id " + "WHERE b.name = :brandName AND a.price <= :maxPrice",
            nativeQuery = true)
    Page<Advertisement> findByBrandAndPriceNative(String brandName, Double maxPrice, Pageable pageable);

    @Query("SELECT a FROM Advertisement a JOIN FETCH a.user JOIN FETCH a.car")
    List<Advertisement> findAllWithFetch();

    List<Advertisement> findAllByCarYear(Integer carYear);

}