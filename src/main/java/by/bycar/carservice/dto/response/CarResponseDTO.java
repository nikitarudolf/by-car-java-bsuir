package by.bycar.carservice.dto.response;

import by.bycar.carservice.model.enums.*;
import lombok.Builder;

import java.util.Set;

@Builder
public record CarResponseDTO(
        Long id,
        Integer year,
        Integer mileage,
        String vin,
        ModelResponseDTO model,
        Set<FeatureResponseDTO> features,
        EngineType engineType,
        Double engineVolume,
        Integer enginePower,
        TransmissionType transmissionType,
        DriveType driveType,
        BodyType bodyType,
        String color,
        Integer doorsCount,
        Double fuelConsumption,
        CarCondition condition,
        Boolean isCustomsCleared) {
}
