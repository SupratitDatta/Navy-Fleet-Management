package backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "personnel")
public class PersonnelEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long personnelId;
    private String name;
    private String rank;
    private String qualification;
    private Long missionId;
    private String password;
    private String email;
    private String address;
}