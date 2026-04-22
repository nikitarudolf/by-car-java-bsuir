package by.bycar.carservice.model;


import by.bycar.carservice.model.enums.*;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "engine_type")
    private EngineType engineType;

    @Column(name = "engine_volume")
    private Double engineVolume;

    @Column(name = "engine_power")
    private Integer enginePower;

    @Enumerated(EnumType.STRING)
    @Column(name = "transmission_type")
    private TransmissionType transmissionType;

    @Enumerated(EnumType.STRING)
    @Column(name = "drive_type")
    private DriveType driveType;

    @Enumerated(EnumType.STRING)
    @Column(name = "body_type")
    private BodyType bodyType;

    @Column(name = "color", length = 50)
    private String color;

    @Column(name = "doors_count")
    private Integer doorsCount;

    @Column(name = "fuel_consumption")
    private Double fuelConsumption;

    @Enumerated(EnumType.STRING)
    @Column(name = "condition")
    private CarCondition condition;

    @Column(name = "is_customs_cleared")
    private Boolean isCustomsCleared;

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
