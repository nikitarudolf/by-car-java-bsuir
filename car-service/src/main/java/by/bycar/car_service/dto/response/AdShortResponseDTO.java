package by.bycar.car_service.dto.response;

public record AdShortResponseDTO(
        Long id,
        Double price,
        String modelName,
        Integer year
) {
}
