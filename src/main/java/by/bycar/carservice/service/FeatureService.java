package by.bycar.carservice.service;

import by.bycar.carservice.dto.create.FeatureCreateDTO;
import by.bycar.carservice.dto.response.FeatureResponseDTO;
import by.bycar.carservice.mapper.FeatureMapper;
import by.bycar.carservice.model.Feature;
import by.bycar.carservice.repository.FeatureRepository;
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
