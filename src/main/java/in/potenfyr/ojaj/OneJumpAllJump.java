package in.potenfyr.ojaj;

import in.potenfyr.ojaj.commands.OneJumpCommand;
import in.potenfyr.ojaj.listeners.JumpListener;
import org.bukkit.plugin.java.JavaPlugin;

public final class OneJumpAllJump extends JavaPlugin {

    private static OneJumpAllJump instance;

    private ConfigManager configManager;

    @Override
    public void onEnable() {

        instance = this;

        saveDefaultConfig();

        // Initialize config manager
        this.configManager = new ConfigManager(this);

        // Register listener
        getServer().getPluginManager().registerEvents(
                new JumpListener(this),
                this
        );

        // Register command
        getCommand("onejump").setExecutor(
                new OneJumpCommand(this)
        );

        getLogger().info("OneJumpAllJump enabled.");
    }

    @Override
    public void onDisable() {
        getLogger().info("OneJumpAllJump disabled.");
    }

    public static OneJumpAllJump getInstance() {
        return instance;
    }

    // THIS METHOD FIXES YOUR ERROR
    public ConfigManager getConfigManager() {
        return configManager;
    }
}