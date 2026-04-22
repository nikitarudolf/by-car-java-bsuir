package by.bycar.carservice.concurrency;

import java.util.concurrent.atomic.AtomicLong;

public class AtomicViewCounter implements ViewCounter {
    private final AtomicLong count = new AtomicLong(0);

    @Override
    public void increment() {
        count.incrementAndGet();
    }

    @Override
    public long getCount() {
        return count.get();
    }

    @Override
    public void reset() {
        count.set(0);
    }
}
