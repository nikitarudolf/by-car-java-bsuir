package by.bycar.carservice.concurrency;

public class UnsafeViewCounter implements ViewCounter {
    private long count = 0;

    @Override
    public void increment() {
        count++;
    }

    @Override
    public long getCount() {
        return count;
    }

    @Override
    public void reset() {
        count = 0;
    }
}
