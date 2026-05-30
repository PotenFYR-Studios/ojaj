package in.potenfyr.ojaj.managers;

import in.potenfyr.ojaj.OneJumpAllJump;
import org.bukkit.entity.Player;
import org.bukkit.scheduler.BukkitTask;

public class EffectManager {

    private final OneJumpAllJump plugin;

    public EffectManager(OneJumpAllJump plugin) {
        this.plugin = plugin;
    }

    public void createTrail(
            Player player,
            org.bukkit.Particle particle,
            int amount,
            int duration
    ) {

        final int[] ticks = {0};

        final BukkitTask[] task =
                new BukkitTask[1];

        task[0] = plugin.getServer()
                .getScheduler()
                .runTaskTimer(
                        plugin,
                        () -> {

                            if (!player.isOnline()) {

                                task[0].cancel();
                                return;
                            }

                            player.spawnParticle(
                                    particle,
                                    player.getLocation(),
                                    amount,
                                    0.15,
                                    0.15,
                                    0.15,
                                    0
                            );

                            ticks[0]++;

                            if (ticks[0] >= duration) {
                                task[0].cancel();
                            }
                        },
                        0L,
                        1L
                );
    }
}