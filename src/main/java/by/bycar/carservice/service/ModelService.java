package by.bycar.carservice.service;

import by.bycar.carservice.dto.create.ModelCreateDTO;
import by.bycar.carservice.dto.response.ModelResponseDTO;
import by.bycar.carservice.dto.update.ModelUpdateDTO;
import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.mapper.ModelMapper;
import by.bycar.carservice.model.Brand;
import by.bycar.carservice.model.Model;
import by.bycar.carservice.repository.BrandRepository;
import by.bycar.carservice.repository.ModelRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModelService {
    private final ModelRepository modelRepository;
    private final BrandRepository brandRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public ModelResponseDTO create(ModelCreateDTO modelCreateDTO) {
        Model model = modelMapper.toEntity(modelCreateDTO);
        Model savedModel = modelRepository.save(model);
        return modelMapper.toResponseDTO(savedModel);
    }

    public List<ModelResponseDTO> findAll() {
        return modelRepository.findAll()
                .stream()
                .map(modelMapper::toResponseDTO)
                .toList();
    }

    public Optional<ModelResponseDTO> findById(Long id) {
        return modelRepository.findById(id)
                .map(modelMapper::toResponseDTO);
    }

    @Transactional
    public ModelResponseDTO update(Long id, ModelUpdateDTO dto) {
        Model model = modelRepository.findById(id)
                .orElseThrow(() -> new CarServiceException("Модель с id " + id + " не найдена"));

        modelMapper.updateEntityFromDto(dto, model);

        if (dto.brandId() != null) {
            Brand brand = brandRepository.findById(dto.brandId())
                    .orElseThrow(() -> new CarServiceException("Бренд не найден"));
            model.setBrand(brand);
        }

        return modelMapper.toResponseDTO(modelRepository.save(model));
    }

    @Transactional
    public void deleteById(Long id) {
        modelRepository.deleteById(id);
    }
}
