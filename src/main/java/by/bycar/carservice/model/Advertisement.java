package by.bycar.carservice.model;

import by.bycar.carservice.model.enums.AdvertisementStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Advertisement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "title", length = 200)
    private String title;

    @NotBlank
    @Column(name = "description", length = 2000)
    private String description;

    @DecimalMin("1")
    @Column(name = "price")
    private Double price;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "region", length = 100)
    private String region;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "views_count")
    @Builder.Default
    private Long viewsCount = 0L;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @Builder.Default
    private AdvertisementStatus status = AdvertisementStatus.DRAFT;

    @Column(name = "show_phone")
    @Builder.Default
    private Boolean showPhone = true;

    @Column(name = "contact_name", length = 100)
    private String contactName;

    @Column(name = "negotiable")
    @Builder.Default
    private Boolean negotiable = false;

    @Column(name = "exchange_possible")
    @Builder.Default
    private Boolean exchangePossible = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id", unique = true)
    @NotNull
    private Car car;

    @OneToMany(mappedBy = "advertisement", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Photo> photos = new ArrayList<>();

    @OneToMany(mappedBy = "advertisement", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Favorite> favorites = new ArrayList<>();
}