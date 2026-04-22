package by.bycar.carservice.concurrency;

public interface ViewCounter {
    void increment();
    long getCount();
    void reset();
}
