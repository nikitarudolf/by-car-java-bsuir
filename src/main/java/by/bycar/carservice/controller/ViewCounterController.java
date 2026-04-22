package by.bycar.carservice.controller;

import by.bycar.carservice.concurrency.ViewCounterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
public class ViewCounterController {
    private final ViewCounterService viewCounterService;

    @PostMapping("/{advertisementId}/view/unsafe")
    public ResponseEntity<Void> incrementViewsUnsafe(@PathVariable Long advertisementId) {
        viewCounterService.incrementViewsUnsafe(advertisementId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{advertisementId}/view/synchronized")
    public ResponseEntity<Void> incrementViewsSynchronized(@PathVariable Long advertisementId) {
        viewCounterService.incrementViewsSynchronized(advertisementId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{advertisementId}/view/atomic")
    public ResponseEntity<Void> incrementViewsAtomic(@PathVariable Long advertisementId) {
        viewCounterService.incrementViewsAtomic(advertisementId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{advertisementId}/views/unsafe")
    public ResponseEntity<ViewsResponse> getViewsUnsafe(@PathVariable Long advertisementId) {
        long views = viewCounterService.getViewsUnsafe(advertisementId);
        return ResponseEntity.ok(new ViewsResponse(advertisementId, views, "UNSAFE"));
    }

    @GetMapping("/{advertisementId}/views/synchronized")
    public ResponseEntity<ViewsResponse> getViewsSynchronized(@PathVariable Long advertisementId) {
        long views = viewCounterService.getViewsSynchronized(advertisementId);
        return ResponseEntity.ok(new ViewsResponse(advertisementId, views, "SYNCHRONIZED"));
    }

    @GetMapping("/{advertisementId}/views/atomic")
    public ResponseEntity<ViewsResponse> getViewsAtomic(@PathVariable Long advertisementId) {
        long views = viewCounterService.getViewsAtomic(advertisementId);
        return ResponseEntity.ok(new ViewsResponse(advertisementId, views, "ATOMIC"));
    }

    record ViewsResponse(Long advertisementId, long views, String type) {}
}
