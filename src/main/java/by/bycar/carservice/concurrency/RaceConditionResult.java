package by.bycar.carservice.concurrency;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RaceConditionResult {
    private long expected;
    private long actual;
    private long lost;
    private long executionTimeMs;
    private String type;
}
