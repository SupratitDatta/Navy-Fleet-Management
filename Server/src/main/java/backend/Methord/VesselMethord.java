package backend.Methord;

import backend.Model.VesselModel;
import java.util.List;

public interface VesselMethord {
    String createVessel(VesselModel vessel);
    List<VesselModel> readAllVessels();
    boolean deleteVessel(Long id);
    String updateVessel(Long id, VesselModel vessel);
    VesselModel readVessel(Long id);
}