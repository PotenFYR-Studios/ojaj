package in.potenfyr.ojaj.listeners;

import com.destroystokyo.paper.event.player.PlayerJumpEvent;
import in.potenfyr.ojaj.ConfigManager;
import in.potenfyr.ojaj.OneJumpAllJump;
import net.kyori.adventure.text.Component;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.scheduler.BukkitTask;
import org.bukkit.util.Vector;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/**
 * Handles synchronized jumping.
 */
public class JumpListener implements Listener {

    private final OneJumpAllJump plugin;

    /**
     * Prevent recursive jump triggers.
     */
    private final Set<UUID> jumpLock = new HashSet<>();

    /**
     * Anti-spam cooldown tracking.
     */
    private final Map<UUID, Long> cooldowns = new HashMap<>();

    public JumpListener(OneJumpAllJump plugin) {
        this.plugin = plugin;
    }

    @EventHandler
    public void onJump(PlayerJumpEvent event) {

        ConfigManager cfg = plugin.getConfigManager();

        Player jumper = event.getPlayer();

        /*
         * Plugin globally disabled
         */
        if (!cfg.isEnabled()) {
            return;
        }

        /*
         * Ignore bypass players
         */
        if (jumper.hasPermission("onejump.bypass")) {
            return;
        }

        /*
         * World whitelist check
         */
        if (!cfg.getWorldWhitelist().contains(
                jumper.getWorld().getName()
        )) {
            return;
        }

        /*
         * Prevent recursive triggers
         */
        if (jumpLock.contains(jumper.getUniqueId())) {
            return;
        }

        /*
         * Cooldown handling
         */
        long cooldownMillis =
                cfg.getCooldownSeconds() * 1000L;

        if (cooldowns.containsKey(jumper.getUniqueId())) {

            long lastTrigger =
                    cooldowns.get(jumper.getUniqueId());

            if (System.currentTimeMillis() - lastTrigger
                    < cooldownMillis) {

                return;
            }
        }

        cooldowns.put(
                jumper.getUniqueId(),
                System.currentTimeMillis()
        );

        /*
         * Make every player jump
         */
        for (Player player : Bukkit.getOnlinePlayers()) {

            jumpLock.add(player.getUniqueId());

            // Preserve X/Z motion while applying Y velocity
            Vector velocity = player.getVelocity();

            velocity.setY(cfg.getJumpVelocity());

            player.setVelocity(velocity);

            /*
             * Spawn jump particles
             */
            if (cfg.particlesEnabled()) {

                player.spawnParticle(
                        cfg.getParticleType(),
                        player.getLocation().add(0, 1, 0),
                        cfg.getParticleAmount(),
                        0.3,
                        0.3,
                        0.3,
                        0.01
                );
            }

            /*
             * Play synchronized sound
             */
            if (cfg.soundEnabled()) {

                player.playSound(
                        player.getLocation(),
                        cfg.getSound(),
                        cfg.getSoundVolume(),
                        cfg.getSoundPitch()
                );
            }

            /*
             * Action bar message
             */
            if (cfg.actionBarEnabled()) {

                player.sendActionBar(
                        Component.text(
                                cfg.getActionBarMessage(
                                        jumper.getName()
                                )
                        )
                );
            }

            /*
             * Particle trail effect
             */
            if (cfg.trailEnabled()) {
                createTrail(player);
            }

            /*
             * Remove jump lock after few ticks
             */
            Bukkit.getScheduler().runTaskLater(
                    plugin,
                    () -> jumpLock.remove(player.getUniqueId()),
                    5L
            );
        }
    }

    /**
     * Creates a temporary particle trail behind player.
     */
    private void createTrail(Player player) {

        ConfigManager cfg = plugin.getConfigManager();

        final int[] ticks = {0};

        final BukkitTask[] task = new BukkitTask[1];

        task[0] = Bukkit.getScheduler().runTaskTimer(
                plugin,
                () -> {

                    if (!player.isOnline()) {
                        task[0].cancel();
                        return;
                    }

                    player.spawnParticle(
                            cfg.getTrailParticle(),
                            player.getLocation(),
                            cfg.getTrailAmount(),
                            0.15,
                            0.15,
                            0.15,
                            0
                    );

                    ticks[0]++;

                    if (ticks[0]
                            >= cfg.getTrailDuration()) {

                        task[0].cancel();
                    }
                },
                0L,
                1L
        );
    }
}