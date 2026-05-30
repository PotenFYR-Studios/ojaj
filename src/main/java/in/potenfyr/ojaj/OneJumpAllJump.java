package in.potenfyr.ojaj;

import in.potenfyr.ojaj.commands.OneJumpCommand;
import in.potenfyr.ojaj.commands.OneJumpTabCompleter;
import in.potenfyr.ojaj.listeners.FallDamageListener;
import in.potenfyr.ojaj.listeners.JumpListener;
import in.potenfyr.ojaj.managers.CooldownManager;
import in.potenfyr.ojaj.managers.EffectManager;
import in.potenfyr.ojaj.managers.StatsManager;
import org.bukkit.plugin.java.JavaPlugin;

public final class OneJumpAllJump extends JavaPlugin {

    private static OneJumpAllJump instance;

    private ConfigManager configManager;
    private CooldownManager cooldownManager;
    private StatsManager statsManager;
    private EffectManager effectManager;

    @Override
    public void onEnable() {

        instance = this;

        saveDefaultConfig();

        this.configManager = new ConfigManager(this);
        this.cooldownManager = new CooldownManager();
        this.statsManager = new StatsManager();
        this.effectManager = new EffectManager(this);

        getServer().getPluginManager().registerEvents(
                new JumpListener(this),
                this
        );

        getServer().getPluginManager().registerEvents(
                new FallDamageListener(this),
                this
        );


        OneJumpCommand command = new OneJumpCommand(this);

        getCommand("onejump").setExecutor(command);
        getCommand("onejump").setTabCompleter(
                new OneJumpTabCompleter()
        );

        getLogger().info("OneJumpAllJump enabled.");
    }

    public static OneJumpAllJump getInstance() {
        return instance;
    }

    public ConfigManager getConfigManager() {
        return configManager;
    }

    public CooldownManager getCooldownManager() {
        return cooldownManager;
    }

    public StatsManager getStatsManager() {
        return statsManager;
    }

    public EffectManager getEffectManager() {
        return effectManager;
    }
}