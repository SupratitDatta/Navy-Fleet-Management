package backend.Middleware;

import backend.Entity.PersonnelEntity;
import backend.Entity.PersonnelRepository;
import backend.Methord.PersonnelMethord;
import backend.Model.PersonnelModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonnelMiddleware implements PersonnelMethord {

    @Autowired
    private PersonnelRepository personnelRepository;

    @Override
    public String createPersonnel(PersonnelModel personnel) {
        PersonnelEntity personnelEntity = new PersonnelEntity();
        BeanUtils.copyProperties(personnel, personnelEntity);
        personnelRepository.save(personnelEntity);
        return "Personnel Added Successfully";
    }

    @Override
    public PersonnelModel readPersonnel(Long id) {
        PersonnelEntity personnelEntity = personnelRepository.findById(id).orElse(null);
        if (personnelEntity == null) return null;

        PersonnelModel personnel = new PersonnelModel();
        BeanUtils.copyProperties(personnelEntity, personnel);
        return personnel;
    }

    @Override
    public List<PersonnelModel> readAllPersonnel() {
        List<PersonnelEntity> personnelEntities = personnelRepository.findAll();
        List<PersonnelModel> personnelList = new ArrayList<>();
        for (PersonnelEntity personnelEntity : personnelEntities) {
            PersonnelModel personnel = new PersonnelModel();
            BeanUtils.copyProperties(personnelEntity, personnel);
            personnelList.add(personnel);
        }
        return personnelList;
    }

    @Override
    public boolean deletePersonnel(Long id) {
        if (personnelRepository.existsById(id)) {
            personnelRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public String updatePersonnel(Long id, PersonnelModel personnel) {
        PersonnelEntity existingPersonnel = personnelRepository.findById(id).orElse(null);
        if (existingPersonnel == null) return "Personnel not found";

        BeanUtils.copyProperties(personnel, existingPersonnel);
        personnelRepository.save(existingPersonnel);
        return "Personnel Data Updated Successfully";
    }
}