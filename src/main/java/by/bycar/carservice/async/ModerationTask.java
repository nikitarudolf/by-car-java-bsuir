package by.bycar.carservice.async;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModerationTask {
    private String taskId;
    private Long advertisementId;
    private ModerationStatus status;
    private ModerationResult result;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
}
