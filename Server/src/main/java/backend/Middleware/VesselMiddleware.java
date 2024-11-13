package backend.Middleware;

import backend.Entity.VesselEntity;
import backend.Entity.VesselRepository;
import backend.Methord.VesselMethord;
import backend.Model.VesselModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VesselMiddleware implements VesselMethord {

    @Autowired
    private VesselRepository vesselRepository;

    @Override
    public String createVessel(VesselModel vessel) {
        VesselEntity vesselEntity = new VesselEntity();
        BeanUtils.copyProperties(vessel, vesselEntity);
        vesselRepository.save(vesselEntity);
        return "Vessel Added Successfully";
    }

    @Override
    public VesselModel readVessel(Long id) {
        VesselEntity vesselEntity = vesselRepository.findById(id).orElse(null);
        if (vesselEntity == null) return null;

        VesselModel vessel = new VesselModel();
        BeanUtils.copyProperties(vesselEntity, vessel);
        return vessel;
    }

    @Override
    public List<VesselModel> readAllVessels() {
        List<VesselEntity> vesselEntities = vesselRepository.findAll();
        List<VesselModel> vesselList = new ArrayList<>();
        for (VesselEntity vesselEntity : vesselEntities) {
            VesselModel vessel = new VesselModel();
            BeanUtils.copyProperties(vesselEntity, vessel);
            vesselList.add(vessel);
        }
        return vesselList;
    }

    @Override
    public boolean deleteVessel(Long id) {
        if (vesselRepository.existsById(id)) {
            vesselRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public String updateVessel(Long id, VesselModel vessel) {
        VesselEntity existingVessel = vesselRepository.findById(id).orElse(null);
        if (existingVessel == null) return "Vessel not found";

        BeanUtils.copyProperties(vessel, existingVessel);
        vesselRepository.save(existingVessel);
        return "Vessel Data Updated Successfully";
    }
}