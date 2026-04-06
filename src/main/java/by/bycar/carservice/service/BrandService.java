package by.bycar.carservice.service;

import by.bycar.carservice.dto.create.BrandCreateDTO;
import by.bycar.carservice.dto.response.BrandResponseDTO;
import by.bycar.carservice.dto.update.BrandUpdateDTO;
import by.bycar.carservice.exception.CarServiceException;
import by.bycar.carservice.mapper.BrandMapper;
import by.bycar.carservice.model.Brand;
import by.bycar.carservice.repository.BrandRepository;
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
        return brandMapper.toResponseDTO(savedBrand);
    }

    public List<BrandResponseDTO> findALl() {
        return brandRepository.findAll()
                .stream()
                .map(brandMapper::toResponseDTO)
                .toList();
    }

    @Transactional
    public BrandResponseDTO update(Long id, BrandUpdateDTO dto) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new CarServiceException("Бренд с id " + id + " не найден"));

        brandMapper.updateEntityFromDto(dto, brand);

        return brandMapper.toResponseDTO(brandRepository.save(brand));
    }

    @Transactional
    public void deleteById(Long id) {
        brandRepository.deleteById(id);
    }
}
