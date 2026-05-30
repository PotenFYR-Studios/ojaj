package in.potenfyr.ojaj.managers;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class StatsManager {

    private final Map<UUID, Integer> jumps =
            new HashMap<>();

    public void addJump(UUID uuid) {

        jumps.put(
                uuid,
                jumps.getOrDefault(uuid, 0) + 1
        );
    }

    public int getJumps(UUID uuid) {

        return jumps.getOrDefault(uuid, 0);
    }
}