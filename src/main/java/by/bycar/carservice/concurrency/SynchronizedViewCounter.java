package by.bycar.carservice.concurrency;

public class
SynchronizedViewCounter implements ViewCounter {
    private long count = 0;

    @Override
    public synchronized void increment() {
        count++;
    }

    @Override
    public synchronized long getCount() {
        return count;
    }

    @Override
    public synchronized void reset() {
        count = 0;
    }
}
