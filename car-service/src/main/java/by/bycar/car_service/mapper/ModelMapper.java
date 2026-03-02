package by.bycar.car_service.mapper;

import by.bycar.car_service.dto.create.ModelCreateDTO;
import by.bycar.car_service.dto.response.ModelResponseDTO;
import by.bycar.car_service.model.Model;
import by.bycar.car_service.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ModelMapper {
    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;

    public Model toEntity(ModelCreateDTO modelCreateDTO) {
        return Model.builder()
                .name(modelCreateDTO.name())
                .brand(brandRepository.findById(modelCreateDTO.brandId()).orElseThrow())
                .build();
    }

    public ModelResponseDTO toDTO(Model model) {
        return ModelResponseDTO.builder()
                .id(model.getId())
                .name(model.getName())
                .brand(brandMapper
                        .toDTO(model.getBrand()))
                .build();
    }
}
