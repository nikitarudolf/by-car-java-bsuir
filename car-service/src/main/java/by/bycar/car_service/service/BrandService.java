package by.bycar.car_service.service;

import by.bycar.car_service.dto.create.BrandCreateDTO;
import by.bycar.car_service.dto.response.BrandResponseDTO;
import by.bycar.car_service.mapper.BrandMapper;
import by.bycar.car_service.model.Brand;
import by.bycar.car_service.repository.BrandRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;

    @Transactional
    public BrandResponseDTO create(BrandCreateDTO brandCreateDTO) {
        Brand brand = brandMapper.toEntity(brandCreateDTO);
        Brand savedBrand = brandRepository.save(brand);
        return brandMapper.toDTO(savedBrand);
    }

    public List<BrandResponseDTO> findALl() {
        return brandRepository.findAll()
                .stream()
                .map(brandMapper::toDTO)
                .toList();
    }

    @Transactional
    public void deleteById(Long id) {
        brandRepository.deleteById(id);
    }
}
