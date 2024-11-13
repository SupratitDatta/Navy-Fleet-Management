package backend.Controller;

import backend.Methord.MissionMethord;
import backend.Model.MissionModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("mission")
public class MissionController {

    @Autowired
    private MissionMethord missionService;

    @GetMapping("/getallmission")
    public List<MissionModel> getAllMissions() {
        return missionService.readAllMissions();
    }

    @GetMapping("/get/{id}")
    public MissionModel getMissionById(@PathVariable Long id) {
        return missionService.readMission(id);
    }

    @PostMapping("/add")
    public String createMission(@RequestBody MissionModel mission) {
        return missionService.createMission(mission);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteMission(@PathVariable Long id) {
        return missionService.deleteMission(id) ? "Mission Deleted Successfully" : "Mission not found";
    }

    @PutMapping("/update/{id}")
    public String updateMission(@PathVariable Long id, @RequestBody MissionModel mission) {
        return missionService.updateMission(id, mission);
    }
}