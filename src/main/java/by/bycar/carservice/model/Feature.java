package by.bycar.carservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "features")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(exclude = "cars")
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "feature_seq")
    @SequenceGenerator(name = "feature_seq", sequenceName = "feature_seq", allocationSize = 50)
    private Long id;
    @Column(name = "name", length = 50)
    @NotBlank
    private String name;

    @ManyToMany(mappedBy = "features", fetch = FetchType.LAZY)
    private Set<Car> cars;
}
