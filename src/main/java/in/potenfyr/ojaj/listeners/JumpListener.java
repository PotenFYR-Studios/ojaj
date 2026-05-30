package in.potenfyr.ojaj.listeners;

import com.destroystokyo.paper.event.player.PlayerJumpEvent;
import in.potenfyr.ojaj.ConfigManager;
import in.potenfyr.ojaj.OneJumpAllJump;
import in.potenfyr.ojaj.model.CachedSettings;
import in.potenfyr.ojaj.utils.RandomUtil;
import net.kyori.adventure.text.Component;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.util.Vector;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class JumpListener implements Listener {

    private final OneJumpAllJump plugin;

    private final Set<UUID> jumpLock =
            new HashSet<>();

    public JumpListener(OneJumpAllJump plugin) {
        this.plugin = plugin;
    }

    @EventHandler
    public void onJump(PlayerJumpEvent event) {

        CachedSettings cfg =
                plugin.getConfigManager().getSettings();

        Player jumper = event.getPlayer();

        if (!cfg.enabled()) {
            return;
        }

        if (jumpLock.contains(jumper.getUniqueId())) {
            return;
        }

        if (jumper.hasPermission(
                "onejump.bypass"
        )) {
            return;
        }

        boolean allowed;

        if (cfg.worldMode().equalsIgnoreCase(
                "whitelist"
        )) {

            allowed = cfg.worldList().contains(
                    jumper.getWorld().getName()
            );

        } else {

            allowed = !cfg.worldList().contains(
                    jumper.getWorld().getName()
            );
        }

        if (!allowed) {
            return;
        }

        long cooldownMillis =
                cfg.cooldownSeconds() * 1000L;

        if (plugin.getCooldownManager()
                .isOnCooldown(
                        jumper.getUniqueId(),
                        cooldownMillis
                )) {

            return;
        }

        plugin.getCooldownManager()
                .setCooldown(jumper.getUniqueId());

        if (cfg.triggerChanceEnabled()) {

            int random =
                    RandomUtil.randomInt(1, 100);

            if (random > cfg.triggerChance()) {
                return;
            }
        }

        plugin.getStatsManager()
                .addJump(jumper.getUniqueId());

        for (Player player :
                Bukkit.getOnlinePlayers()) {

            jumpLock.add(player.getUniqueId());

            double yVelocity = cfg.velocityY();

            if (cfg.randomVelocity()) {

                yVelocity = RandomUtil.randomDouble(
                        cfg.randomMin(),
                        cfg.randomMax()
                );
            }

            Vector velocity =
                    player.getVelocity();

            velocity.setY(yVelocity);

            player.setVelocity(velocity);

            if (cfg.particlesEnabled()) {

                player.spawnParticle(
                        cfg.particle(),
                        player.getLocation().add(0, 1, 0),
                        cfg.particleAmount(),
                        0.3,
                        0.3,
                        0.3,
                        0.01
                );
            }

            if (cfg.soundEnabled()) {

                player.playSound(
                        player.getLocation(),
                        cfg.sound(),
                        cfg.volume(),
                        cfg.pitch()
                );
            }

            if (cfg.actionbarEnabled()) {

                player.sendActionBar(
                        Component.text(
                                cfg.actionbarMessage()
                                        .replace(
                                                "%player%",
                                                jumper.getName()
                                        )
                        )
                );
            }

            if (cfg.titlesEnabled()) {

                player.sendTitlePart(
                        net.kyori.adventure.title.TitlePart.TITLE,
                        Component.text(
                                cfg.title()
                                        .replace(
                                                "%player%",
                                                jumper.getName()
                                        )
                        )
                );

                player.sendTitlePart(
                        net.kyori.adventure.title.TitlePart.SUBTITLE,
                        Component.text(
                                cfg.subtitle()
                                        .replace(
                                                "%player%",
                                                jumper.getName()
                                        )
                        )
                );
            }

            if (cfg.trailEnabled()) {

                plugin.getEffectManager()
                        .createTrail(
                                player,
                                cfg.trailParticle(),
                                cfg.trailAmount(),
                                cfg.trailDuration()
                        );
            }

            Bukkit.getScheduler().runTaskLater(
                    plugin,
                    () -> jumpLock.remove(
                            player.getUniqueId()
                    ),
                    5L
            );
        }

        if (cfg.broadcastEnabled()) {

            Bukkit.broadcast(
                    Component.text(
                            cfg.broadcastMessage()
                                    .replace(
                                            "%player%",
                                            jumper.getName()
                                    )
                    )
            );
        }
    }
}