package by.bycar.car_service.service;

import by.bycar.car_service.dto.create.FeatureCreateDTO;
import by.bycar.car_service.dto.response.FeatureResponseDTO;
import by.bycar.car_service.mapper.FeatureMapper;
import by.bycar.car_service.model.Feature;
import by.bycar.car_service.repository.FeatureRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeatureService {
    private final FeatureRepository featureRepository;
    private final FeatureMapper featureMapper;

    @Transactional
    public FeatureResponseDTO create(FeatureCreateDTO featureCreateDTO) {
        Feature feature = featureMapper.toEntity(featureCreateDTO);
        Feature savedFeature = featureRepository.save(feature);
        return featureMapper.toDTO(savedFeature);
    }


    public List<FeatureResponseDTO> findAll() {
        return featureRepository.findAll().
                stream().
                map(featureMapper::toDTO).
                toList();
    }

    @Transactional
    public void deleteById(Long id) {
        featureRepository.deleteById(id);
    }
}
