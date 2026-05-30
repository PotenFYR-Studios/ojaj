package in.potenfyr.ojaj;

import org.bukkit.ChatColor;
import org.bukkit.Particle;
import org.bukkit.Sound;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.NamespacedKey;
import org.bukkit.Registry;
import java.util.List;

/**
 * Handles config access and parsing.
 */
public class ConfigManager {

    private final OneJumpAllJump plugin;

    public ConfigManager(OneJumpAllJump plugin) {
        this.plugin = plugin;
    }

    /**
     * Reload config from disk.
     */
    public void reload() {
        plugin.reloadConfig();
    }

    /**
     * Shortcut to get config object.
     */
    public FileConfiguration get() {
        return plugin.getConfig();
    }

    public boolean isEnabled() {
        return get().getBoolean("enabled");
    }

    public int getCooldownSeconds() {
        return get().getInt("cooldown-seconds");
    }

    public double getJumpVelocity() {
        return get().getDouble("velocity.y");
    }

    public boolean particlesEnabled() {
        return get().getBoolean("particles.enabled");
    }

    public Particle getParticleType() {
        return Particle.valueOf(
                get().getString("particles.type")
        );
    }

    public int getParticleAmount() {
        return get().getInt("particles.amount");
    }

    public boolean trailEnabled() {
        return get().getBoolean("trail.enabled");
    }

    public Particle getTrailParticle() {
        return Particle.valueOf(
                get().getString("trail.particle")
        );
    }

    public int getTrailDuration() {
        return get().getInt("trail.duration-ticks");
    }

    public int getTrailAmount() {
        return get().getInt("trail.amount");
    }

    public boolean soundEnabled() {
        return get().getBoolean("sound.enabled");
    }

    public Sound getSound() {

        String soundName =
                get().getString("sound.type");

        if (soundName == null) {
            return Sound.ENTITY_FIREWORK_ROCKET_LAUNCH;
        }

        Sound sound = Registry.SOUNDS.get(
                NamespacedKey.minecraft(
                        soundName.toLowerCase()
                )
        );

        if (sound == null) {
            return Sound.ENTITY_FIREWORK_ROCKET_LAUNCH;
        }

        return sound;
    }

    public float getSoundVolume() {
        return (float) get().getDouble("sound.volume");
    }

    public float getSoundPitch() {
        return (float) get().getDouble("sound.pitch");
    }

    public boolean actionBarEnabled() {
        return get().getBoolean("actionbar.enabled");
    }

    public String getActionBarMessage(String player) {

        return color(
                get().getString("actionbar.message")
                        .replace("%player%", player)
        );
    }

    public List<String> getWorldWhitelist() {
        return get().getStringList("worlds.whitelist");
    }

    public String getMessage(String path) {

        return color(
                get().getString("messages." + path)
        );
    }

    /**
     * Convert & color codes.
     */
    private String color(String text) {

        return ChatColor.translateAlternateColorCodes(
                '&',
                text
        );
    }
}