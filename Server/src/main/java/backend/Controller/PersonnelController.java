package backend.Controller;

import backend.Methord.PersonnelMethord;
import backend.Model.PersonnelModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("personnel")
public class PersonnelController {

    @Autowired
    private PersonnelMethord personnelService;

    @GetMapping("/getall")
    public List<PersonnelModel> getAllPersonnel() {
        return personnelService.readAllPersonnel();
    }

    @GetMapping("/get/{id}")
    public PersonnelModel getPersonnelById(@PathVariable Long id) {
        return personnelService.readPersonnel(id);
    }

    @PostMapping("/register")
    public String createPersonnel(@RequestBody PersonnelModel personnel) {
        return personnelService.createPersonnel(personnel);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePersonnel(@PathVariable Long id) {
        return personnelService.deletePersonnel(id) ? "Personnel Deleted Successfully" : "Personnel not found";
    }

    @PutMapping("/update/{id}")
    public String updatePersonnel(@PathVariable Long id, @RequestBody PersonnelModel personnel) {
        return personnelService.updatePersonnel(id, personnel);
    }
}