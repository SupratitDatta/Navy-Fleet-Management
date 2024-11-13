package backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "vessel")
public class VesselEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vesselId;
    private String name;
    private String type;
    private String status;
    private Long missionId;
    private String missionName;
    private Integer crew;
    private Double rangeOfShip;
    private Double weight;
    private Double length;
}