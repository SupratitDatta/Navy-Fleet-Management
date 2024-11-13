package backend.Methord;

import backend.Model.PersonnelModel;
import java.util.List;

public interface PersonnelMethord {
    String createPersonnel(PersonnelModel personnel);
    List<PersonnelModel> readAllPersonnel();
    boolean deletePersonnel(Long id);
    String updatePersonnel(Long id, PersonnelModel personnel);
    PersonnelModel readPersonnel(Long id);
}