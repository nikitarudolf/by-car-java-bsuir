package by.bycar.carservice.dto.response;

public record AdShortResponseDTO(
        Long id,
        Double price,
        String modelName,
        Integer year
) {
}
