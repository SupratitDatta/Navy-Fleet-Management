package backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "mission")
public class MissionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long missionId;
    private String name;
    private String description;
    private Long createdById;
    private String creatorName;
    private String creatorRank;
    private String assignedVesselName;
    private String startDate;
    private String endDate;
}