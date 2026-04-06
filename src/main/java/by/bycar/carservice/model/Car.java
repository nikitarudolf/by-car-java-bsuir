package by.bycar.carservice.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "cars")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @DecimalMin("1000")
    private Integer year;
    @DecimalMin("1")
    private Integer mileage;
    @Column(name = "vin", length = 17)
    @NotBlank
    private String vin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    @NotNull
    private Model model;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "car_features",
            joinColumns = @JoinColumn(name = "car_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    private Set<Feature> features;

    @OneToOne(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
    private Advertisement advertisement;
}
