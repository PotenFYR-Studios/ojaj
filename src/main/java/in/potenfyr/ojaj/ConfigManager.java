package in.potenfyr.ojaj;

import in.potenfyr.ojaj.model.CachedSettings;
import in.potenfyr.ojaj.utils.ColorUtil;
import org.bukkit.NamespacedKey;
import org.bukkit.Particle;
import org.bukkit.Registry;
import org.bukkit.Sound;

public class ConfigManager {

    private final OneJumpAllJump plugin;

    private CachedSettings settings;

    public ConfigManager(OneJumpAllJump plugin) {

        this.plugin = plugin;

        load();
    }

    /**
     * Reload config from disk.
     */
    public void reload() {

        plugin.reloadConfig();

        load();
    }

    /**
     * Cache all config values for performance.
     */
    private void load() {

        settings = new CachedSettings(

                plugin.getConfig().getBoolean(
                        "enabled"
                ),

                plugin.getConfig().getInt(
                        "cooldown.seconds"
                ),

                plugin.getConfig().getDouble(
                        "velocity.y"
                ),

                plugin.getConfig().getBoolean(
                        "velocity.random.enabled"
                ),

                plugin.getConfig().getDouble(
                        "velocity.random.min"
                ),

                plugin.getConfig().getDouble(
                        "velocity.random.max"
                ),

                plugin.getConfig().getBoolean(
                        "trigger-chance.enabled"
                ),

                plugin.getConfig().getInt(
                        "trigger-chance.chance"
                ),

                plugin.getConfig().getBoolean(
                        "fall-damage.cancel"
                ),

                plugin.getConfig().getBoolean(
                        "particles.enabled"
                ),

                getParticle(
                        plugin.getConfig().getString(
                                "particles.type"
                        ),
                        Particle.END_ROD
                ),

                plugin.getConfig().getInt(
                        "particles.amount"
                ),

                plugin.getConfig().getBoolean(
                        "trail.enabled"
                ),

                getParticle(
                        plugin.getConfig().getString(
                                "trail.particle"
                        ),
                        Particle.HAPPY_VILLAGER
                ),

                plugin.getConfig().getInt(
                        "trail.amount"
                ),

                plugin.getConfig().getInt(
                        "trail.duration-ticks"
                ),

                plugin.getConfig().getBoolean(
                        "sound.enabled"
                ),

                getSound(
                        plugin.getConfig().getString(
                                "sound.type"
                        ),
                        Sound.ENTITY_FIREWORK_ROCKET_LAUNCH
                ),

                (float) plugin.getConfig().getDouble(
                        "sound.volume"
                ),

                (float) plugin.getConfig().getDouble(
                        "sound.pitch"
                ),

                plugin.getConfig().getBoolean(
                        "actionbar.enabled"
                ),

                ColorUtil.color(
                        plugin.getConfig().getString(
                                "actionbar.message"
                        )
                ),

                plugin.getConfig().getBoolean(
                        "titles.enabled"
                ),

                ColorUtil.color(
                        plugin.getConfig().getString(
                                "titles.title"
                        )
                ),

                ColorUtil.color(
                        plugin.getConfig().getString(
                                "titles.subtitle"
                        )
                ),

                plugin.getConfig().getInt(
                        "titles.fadein"
                ),

                plugin.getConfig().getInt(
                        "titles.stay"
                ),

                plugin.getConfig().getInt(
                        "titles.fadeout"
                ),

                plugin.getConfig().getBoolean(
                        "broadcast.enabled"
                ),

                ColorUtil.color(
                        plugin.getConfig().getString(
                                "broadcast.message"
                        )
                ),

                plugin.getConfig().getString(
                        "worlds.mode"
                ),

                plugin.getConfig().getStringList(
                        "worlds.list"
                )
        );
    }

    /**
     * Get cached settings.
     */
    public CachedSettings getSettings() {
        return settings;
    }

    /**
     * Parse particle safely.
     */
    private Particle getParticle(
            String name,
            Particle fallback
    ) {

        if (name == null) {
            return fallback;
        }

        Particle particle =
                Registry.PARTICLE_TYPE.get(
                        NamespacedKey.minecraft(
                                name.toLowerCase()
                        )
                );

        return particle != null
                ? particle
                : fallback;
    }

    /**
     * Parse sound safely.
     */
    private Sound getSound(
            String name,
            Sound fallback
    ) {

        if (name == null) {
            return fallback;
        }

        Sound sound =
                Registry.SOUNDS.get(
                        NamespacedKey.minecraft(
                                name.toLowerCase()
                        )
                );

        return sound != null
                ? sound
                : fallback;
    }
}