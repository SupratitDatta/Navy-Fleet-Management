package backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonnelModel {
    private Long personnelId;
    private String name;
    private String rank;
    private String qualification;
    private Long missionId;
    private String password;
    private String email;
    private String address;
}