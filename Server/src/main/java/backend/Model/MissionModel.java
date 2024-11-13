package backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MissionModel {
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