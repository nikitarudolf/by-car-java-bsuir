package by.bycar.car_service.service;

import by.bycar.car_service.dto.create.ModelCreateDTO;
import by.bycar.car_service.dto.response.ModelResponseDTO;
import by.bycar.car_service.mapper.ModelMapper;
import by.bycar.car_service.model.Model;
import by.bycar.car_service.repository.ModelRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModelService {
    private final ModelRepository modelRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public ModelResponseDTO create(ModelCreateDTO modelCreateDTO) {
        Model model = modelMapper.toEntity(modelCreateDTO);
        Model savedModel = modelRepository.save(model);
        return modelMapper.toDTO(savedModel);
    }

    public List<ModelResponseDTO> findAll() {
        return modelRepository.findAll()
                .stream()
                .map(modelMapper::toDTO)
                .toList();
    }

    @Transactional
    public void deleteById(Long id) {
        modelRepository.deleteById(id);
    }
}
