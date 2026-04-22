package by.bycar.carservice.async;

import by.bycar.carservice.exception.CarServiceException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AsyncModerationService {
    private final TaskStorage taskStorage;
    private final AsyncModerationExecutor asyncExecutor;

    public String startModeration(Long advertisementId) {
        String taskId = UUID.randomUUID().toString();
        ModerationTask task = ModerationTask.builder()
                .taskId(taskId)
                .advertisementId(advertisementId)
                .status(ModerationStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        taskStorage.save(task);

        asyncExecutor.executeModeration(taskId, advertisementId);

        return taskId;
    }

    public ModerationTask getTaskStatus(String taskId) {
        ModerationTask task = taskStorage.get(taskId);
        if (task == null) {
            throw new CarServiceException("Задача не найдена");
        }
        return task;
    }
}
