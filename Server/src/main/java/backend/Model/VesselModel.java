package backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VesselModel {
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