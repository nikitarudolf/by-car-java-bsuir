package by.bycar.carservice.concurrency;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

@Service
@RequiredArgsConstructor
public class RaceConditionDemoService {
    private final ViewCounterService viewCounterService;

    public RaceConditionResult simulateUnsafe(Long advertisementId, int threads, int incrementsPerThread) {
        viewCounterService.resetAll(advertisementId);
        ViewCounter counter = viewCounterService.getUnsafeCounter(advertisementId);

        long startTime = System.currentTimeMillis();
        runSimulation(counter, threads, incrementsPerThread);
        long endTime = System.currentTimeMillis();

        long expected = (long) threads * incrementsPerThread;
        long actual = counter.getCount();

        return RaceConditionResult.builder()
                .expected(expected)
                .actual(actual)
                .lost(expected - actual)
                .executionTimeMs(endTime - startTime)
                .type("UNSAFE")
                .build();
    }

    public RaceConditionResult simulateSynchronized(Long advertisementId, int threads, int incrementsPerThread) {
        viewCounterService.resetAll(advertisementId);
        ViewCounter counter = viewCounterService.getSynchronizedCounter(advertisementId);

        long startTime = System.currentTimeMillis();
        runSimulation(counter, threads, incrementsPerThread);
        long endTime = System.currentTimeMillis();

        long expected = (long) threads * incrementsPerThread;
        long actual = counter.getCount();

        return RaceConditionResult.builder()
                .expected(expected)
                .actual(actual)
                .lost(expected - actual)
                .executionTimeMs(endTime - startTime)
                .type("SYNCHRONIZED")
                .build();
    }

    public RaceConditionResult simulateAtomic(Long advertisementId, int threads, int incrementsPerThread) {
        viewCounterService.resetAll(advertisementId);
        ViewCounter counter = viewCounterService.getAtomicCounter(advertisementId);

        long startTime = System.currentTimeMillis();
        runSimulation(counter, threads, incrementsPerThread);
        long endTime = System.currentTimeMillis();

        long expected = (long) threads * incrementsPerThread;
        long actual = counter.getCount();

        return RaceConditionResult.builder()
                .expected(expected)
                .actual(actual)
                .lost(expected - actual)
                .executionTimeMs(endTime - startTime)
                .type("ATOMIC")
                .build();
    }

    private void runSimulation(ViewCounter counter, int threads, int incrementsPerThread) {
        ExecutorService executor = Executors.newFixedThreadPool(threads);
        List<Future<?>> futures = new ArrayList<>();

        for (int i = 0; i < threads; i++) {
            Future<?> future = executor.submit(() -> {
                for (int j = 0; j < incrementsPerThread; j++) {
                    counter.increment();
                }
            });
            futures.add(future);
        }

        for (Future<?> future : futures) {
            try {
                future.get();
            } catch (InterruptedException | ExecutionException e) {
                Thread.currentThread().interrupt();
            }
        }

        executor.shutdown();
        try {
            executor.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
