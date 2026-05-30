package in.potenfyr.ojaj.model;

import org.bukkit.Particle;
import org.bukkit.Sound;

import java.util.List;

public record CachedSettings(

        boolean enabled,

        int cooldownSeconds,

        double velocityY,

        boolean randomVelocity,

        double randomMin,

        double randomMax,

        boolean triggerChanceEnabled,

        int triggerChance,

        boolean cancelFallDamage,

        boolean particlesEnabled,

        Particle particle,

        int particleAmount,

        boolean trailEnabled,

        Particle trailParticle,

        int trailAmount,

        int trailDuration,

        boolean soundEnabled,

        Sound sound,

        float volume,

        float pitch,

        boolean actionbarEnabled,

        String actionbarMessage,

        boolean titlesEnabled,

        String title,

        String subtitle,

        int fadeIn,

        int stay,

        int fadeOut,

        boolean broadcastEnabled,

        String broadcastMessage,

        String worldMode,

        List<String> worldList

) {}