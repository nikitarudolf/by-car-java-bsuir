package by.bycar.carservice.async;

import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.model.Advertisement;
import by.bycar.carservice.repository.AdvertisementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Component
@RequiredArgsConstructor
@Slf4j
public class AsyncModerationExecutor {
    private final TaskStorage taskStorage;
    private final AdvertisementRepository advertisementRepository;

    @Async("taskExecutor")
    @Transactional
    public CompletableFuture<Void> executeModeration(String taskId, Long advertisementId) {
        try {
            ModerationTask task = taskStorage.get(taskId);
            task.setStatus(ModerationStatus.PROCESSING);
            taskStorage.update(taskId, task);

            Advertisement ad = advertisementRepository.findById(advertisementId)
                    .orElseThrow(() -> new CarServiceException("Объявление не найдено"));

            Thread.sleep(2000);
            boolean vinValid = validateVin(ad.getCar().getVin());

            Thread.sleep(3000);
            boolean photoQualityOk = checkPhotoQuality();

            Thread.sleep(2000);
            boolean descriptionClean = checkDescription(ad.getDescription());

            Thread.sleep(3000);
            Double estimatedPrice = estimatePrice(ad.getCar().getYear(), ad.getCar().getMileage());

            List<String> errors = new ArrayList<>();
            if (!vinValid) errors.add("VIN не прошел валидацию");
            if (!photoQualityOk) errors.add("Качество фото недостаточное");
            if (!descriptionClean) errors.add("Описание содержит запрещенные слова");

            ModerationResult result = ModerationResult.builder()
                    .vinValid(vinValid)
                    .photoQualityOk(photoQualityOk)
                    .descriptionClean(descriptionClean)
                    .estimatedPrice(estimatedPrice)
                    .errors(errors)
                    .message(errors.isEmpty() ? "Модерация пройдена успешно" : "Модерация не пройдена")
                    .build();

            task.setResult(result);
            task.setStatus(errors.isEmpty() ? ModerationStatus.APPROVED : ModerationStatus.REJECTED);
            task.setCompletedAt(LocalDateTime.now());
            taskStorage.update(taskId, task);

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            ModerationTask task = taskStorage.get(taskId);
            task.setStatus(ModerationStatus.REJECTED);
            taskStorage.update(taskId, task);
        } catch (Exception e) {
            log.error("Error during moderation", e);
            ModerationTask task = taskStorage.get(taskId);
            task.setStatus(ModerationStatus.REJECTED);
            taskStorage.update(taskId, task);
        }

        return CompletableFuture.completedFuture(null);
    }

    private boolean validateVin(String vin) {
        return vin != null && vin.length() == 17 && !vin.contains("X");
    }

    private boolean checkPhotoQuality() {
        return Math.random() > 0.1;
    }

    private boolean checkDescription(String description) {
        String[] bannedWords = {"обман", "развод", "лохотрон"};
        String lowerDesc = description.toLowerCase();
        for (String word : bannedWords) {
            if (lowerDesc.contains(word)) {
                return false;
            }
        }
        return true;
    }

    private Double estimatePrice(Integer year, Integer mileage) {
        double basePrice = 10000.0;
        double yearFactor = (double) (2024 - year) * 500;
        double mileageFactor = (mileage / 10000.0) * 300;
        return Math.max(basePrice - yearFactor - mileageFactor, 1000.0);
    }
}
