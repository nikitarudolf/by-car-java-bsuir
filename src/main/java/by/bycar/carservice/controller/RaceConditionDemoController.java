package by.bycar.carservice.controller;

import by.bycar.carservice.concurrency.RaceConditionDemoService;
import by.bycar.carservice.concurrency.RaceConditionResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/demo/race-condition")
@RequiredArgsConstructor
public class RaceConditionDemoController {
    private final RaceConditionDemoService demoService;

    @PostMapping("/unsafe")
    public ResponseEntity<RaceConditionResult> simulateUnsafe(
            @RequestParam(defaultValue = "1") Long advertisementId,
            @RequestParam(defaultValue = "50") int threads,
            @RequestParam(defaultValue = "1000") int increments) {
        RaceConditionResult result = demoService.simulateUnsafe(advertisementId, threads, increments);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/synchronized")
    public ResponseEntity<RaceConditionResult> simulateSynchronized(
            @RequestParam(defaultValue = "1") Long advertisementId,
            @RequestParam(defaultValue = "50") int threads,
            @RequestParam(defaultValue = "1000") int increments) {
        RaceConditionResult result = demoService.simulateSynchronized(advertisementId, threads, increments);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/atomic")
    public ResponseEntity<RaceConditionResult> simulateAtomic(
            @RequestParam(defaultValue = "1") Long advertisementId,
            @RequestParam(defaultValue = "50") int threads,
            @RequestParam(defaultValue = "1000") int increments) {
        RaceConditionResult result = demoService.simulateAtomic(advertisementId, threads, increments);
        return ResponseEntity.ok(result);
    }
}
