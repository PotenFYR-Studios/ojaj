package in.potenfyr.ojaj.listeners;

import in.potenfyr.ojaj.OneJumpAllJump;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.EntityDamageEvent;

public class FallDamageListener
        implements Listener {

    private final OneJumpAllJump plugin;

    public FallDamageListener(
            OneJumpAllJump plugin
    ) {

        this.plugin = plugin;
    }

    @EventHandler
    public void onDamage(
            EntityDamageEvent event
    ) {

        if (!plugin.getConfigManager()
                .getSettings()
                .cancelFallDamage()) {

            return;
        }

        if (event.getCause()
                == EntityDamageEvent.DamageCause
                .FALL) {

            event.setCancelled(true);
        }
    }
}