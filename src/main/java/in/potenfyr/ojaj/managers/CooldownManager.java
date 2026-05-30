package in.potenfyr.ojaj.managers;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class CooldownManager {

    private final Map<UUID, Long> cooldowns =
            new HashMap<>();

    public boolean isOnCooldown(UUID uuid, long cooldownMillis) {

        if (!cooldowns.containsKey(uuid)) {
            return false;
        }

        long last = cooldowns.get(uuid);

        return System.currentTimeMillis() - last
                < cooldownMillis;
    }

    public void setCooldown(UUID uuid) {

        cooldowns.put(
                uuid,
                System.currentTimeMillis()
        );
    }
}