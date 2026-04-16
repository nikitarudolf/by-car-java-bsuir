package by.bycar.carservice.service;

import by.bycar.carservice.dto.create.FeatureCreateDTO;
import by.bycar.carservice.dto.response.FeatureResponseDTO;
import by.bycar.carservice.dto.update.FeatureUpdateDTO;
import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.mapper.FeatureMapper;
import by.bycar.carservice.model.Feature;
import by.bycar.carservice.repository.FeatureRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeatureService {
    private final FeatureRepository featureRepository;
    private final FeatureMapper featureMapper;

    @Transactional
    public FeatureResponseDTO create(FeatureCreateDTO featureCreateDTO) {
        Feature feature = featureMapper.toEntity(featureCreateDTO);
        Feature savedFeature = featureRepository.save(feature);
        return featureMapper.toResponseDTO(savedFeature);
    }


    public List<FeatureResponseDTO> findAll() {
        return featureRepository.findAll().
                stream().
                map(featureMapper::toResponseDTO).
                toList();
    }

    @Transactional
    public List<FeatureResponseDTO> saveAll(List<FeatureCreateDTO> dtos) {
        List<Feature> entities = Optional.ofNullable(dtos)
                .orElse(Collections.emptyList())
                .stream()
                .map(featureMapper::toEntity)
                .map(feature -> {
                    if ("error".equalsIgnoreCase(feature.getName())) {
                        throw new IllegalArgumentException("Искусственный сбой транзакции");
                    }
                    return feature;
                })
                .toList();

        return featureRepository.saveAll(entities)
                .stream()
                .map(featureMapper::toResponseDTO)
                .toList();
    }

    public Optional<FeatureResponseDTO> findById(Long id) {
        return featureRepository.findById(id)
                .map(featureMapper::toResponseDTO);
    }

    @Transactional
    public FeatureResponseDTO update(Long id, FeatureUpdateDTO dto) {
        Feature feature = featureRepository.findById(id)
                .orElseThrow(() -> new CarServiceException("Опция не найдена"));

        featureMapper.updateEntityFromDto(dto, feature);

        return featureMapper.toResponseDTO(featureRepository.save(feature));
    }

    @Transactional
    public void deleteById(Long id) {
        featureRepository.deleteById(id);
    }
}
