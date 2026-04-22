package by.bycar.carservice.async;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModerationResult {
    private boolean vinValid;
    private boolean photoQualityOk;
    private boolean descriptionClean;
    private Double estimatedPrice;
    private List<String> errors;
    private String message;
}
