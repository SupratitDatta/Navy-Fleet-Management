package backend.Methord;

import backend.Model.MissionModel;
import java.util.List;

public interface MissionMethord {
    String createMission(MissionModel mission);
    List<MissionModel> readAllMissions();
    boolean deleteMission(Long id);
    String updateMission(Long id, MissionModel mission);
    MissionModel readMission(Long id);
}