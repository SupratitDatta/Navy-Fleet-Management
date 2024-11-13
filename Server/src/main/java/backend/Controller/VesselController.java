package backend.Controller;

import backend.Methord.VesselMethord;
import backend.Model.VesselModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("vessel")
public class VesselController {

    @Autowired
    private VesselMethord vesselService;

    @GetMapping("/getallvessel")
    public List<VesselModel> getAllVessels() {
        return vesselService.readAllVessels();
    }

    @GetMapping("/get/{id}")
    public VesselModel getVesselById(@PathVariable Long id) {
        return vesselService.readVessel(id);
    }

    @PostMapping("/add")
    public String createVessel(@RequestBody VesselModel vessel) {
        return vesselService.createVessel(vessel);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteVessel(@PathVariable Long id) {
        return vesselService.deleteVessel(id) ? "Vessel Deleted Successfully" : "Vessel not found";
    }

    @PutMapping("/update/{id}")
    public String updateVessel(@PathVariable Long id, @RequestBody VesselModel vessel) {
        return vesselService.updateVessel(id, vessel);
    }
}