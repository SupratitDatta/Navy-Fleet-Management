package backend.Middleware;

import backend.Entity.MissionEntity;
import backend.Entity.MissionRepository;
import backend.Methord.MissionMethord;
import backend.Model.MissionModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MissionMiddleware implements MissionMethord {

    @Autowired
    private MissionRepository missionRepository;

    @Override
    public String createMission(MissionModel mission) {
        MissionEntity missionEntity = new MissionEntity();
        BeanUtils.copyProperties(mission, missionEntity);
        missionRepository.save(missionEntity);
        return "Mission Created Successfully";
    }

    @Override
    public MissionModel readMission(Long id) {
        MissionEntity missionEntity = missionRepository.findById(id).orElse(null);
        if (missionEntity == null) return null;

        MissionModel mission = new MissionModel();
        BeanUtils.copyProperties(missionEntity, mission);
        return mission;
    }

    @Override
    public List<MissionModel> readAllMissions() {
        List<MissionEntity> missionEntities = missionRepository.findAll();
        List<MissionModel> missionList = new ArrayList<>();
        for (MissionEntity missionEntity : missionEntities) {
            MissionModel mission = new MissionModel();
            BeanUtils.copyProperties(missionEntity, mission);
            missionList.add(mission);
        }
        return missionList;
    }

    @Override
    public boolean deleteMission(Long id) {
        if (missionRepository.existsById(id)) {
            missionRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public String updateMission(Long id, MissionModel mission) {
        MissionEntity existingMission = missionRepository.findById(id).orElse(null);
        if (existingMission == null) return "Mission not found";

        BeanUtils.copyProperties(mission, existingMission);
        missionRepository.save(existingMission);
        return "Mission Data Updated Successfully";
    }
}