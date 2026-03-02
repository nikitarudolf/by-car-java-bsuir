package by.bycar.car_service.repository;

import by.bycar.car_service.model.Advertisement;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {

    @EntityGraph(attributePaths = {"user", "car", "car.model"})
    List<Advertisement> findAll();

    @Query("SELECT a FROM Advertisement a JOIN FETCH a.user JOIN FETCH a.car")
    List<Advertisement> findAllWithFetch();

    List<Advertisement> findAllByCarYear(Integer carYear);

}