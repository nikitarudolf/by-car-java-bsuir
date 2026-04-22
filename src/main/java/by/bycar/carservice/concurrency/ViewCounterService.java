package by.bycar.carservice.concurrency;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class ViewCounterService {
    private final ConcurrentHashMap<Long, ViewCounter> unsafeCounters = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Long, ViewCounter> synchronizedCounters = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Long, ViewCounter> atomicCounters = new ConcurrentHashMap<>();

    public void incrementViewsUnsafe(Long advertisementId) {
        unsafeCounters.computeIfAbsent(advertisementId, k -> new UnsafeViewCounter()).increment();
    }

    public void incrementViewsSynchronized(Long advertisementId) {
        synchronizedCounters.computeIfAbsent(advertisementId, k -> new SynchronizedViewCounter()).increment();
    }

    public void incrementViewsAtomic(Long advertisementId) {
        atomicCounters.computeIfAbsent(advertisementId, k -> new AtomicViewCounter()).increment();
    }

    public long getViewsUnsafe(Long advertisementId) {
        ViewCounter counter = unsafeCounters.get(advertisementId);
        return counter != null ? counter.getCount() : 0;
    }

    public long getViewsSynchronized(Long advertisementId) {
        ViewCounter counter = synchronizedCounters.get(advertisementId);
        return counter != null ? counter.getCount() : 0;
    }

    public long getViewsAtomic(Long advertisementId) {
        ViewCounter counter = atomicCounters.get(advertisementId);
        return counter != null ? counter.getCount() : 0;
    }

    public ViewCounter getUnsafeCounter(Long advertisementId) {
        return unsafeCounters.computeIfAbsent(advertisementId, k -> new UnsafeViewCounter());
    }

    public ViewCounter getSynchronizedCounter(Long advertisementId) {
        return synchronizedCounters.computeIfAbsent(advertisementId, k -> new SynchronizedViewCounter());
    }

    public ViewCounter getAtomicCounter(Long advertisementId) {
        return atomicCounters.computeIfAbsent(advertisementId, k -> new AtomicViewCounter());
    }

    public void resetAll(Long advertisementId) {
        ViewCounter unsafe = unsafeCounters.get(advertisementId);
        if (unsafe != null) unsafe.reset();

        ViewCounter sync = synchronizedCounters.get(advertisementId);
        if (sync != null) sync.reset();

        ViewCounter atomic = atomicCounters.get(advertisementId);
        if (atomic != null) atomic.reset();
    }
}
