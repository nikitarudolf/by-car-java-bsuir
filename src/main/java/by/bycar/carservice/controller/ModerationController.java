package by.bycar.carservice.controller;

import by.bycar.carservice.async.AsyncModerationService;
import by.bycar.carservice.async.ModerationTask;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/moderation")
@RequiredArgsConstructor
public class ModerationController {
    private final AsyncModerationService moderationService;

    @PostMapping("/start/{advertisementId}")
    public ResponseEntity<ModerationTaskResponse> startModeration(@PathVariable Long advertisementId) {
        String taskId = moderationService.startModeration(advertisementId);
        return ResponseEntity.ok(new ModerationTaskResponse(taskId, "PENDING"));
    }

    @GetMapping("/status/{taskId}")
    public ResponseEntity<ModerationTask> getStatus(@PathVariable String taskId) {
        ModerationTask task = moderationService.getTaskStatus(taskId);
        return ResponseEntity.ok(task);
    }

    record ModerationTaskResponse(String taskId, String status) {}
}
