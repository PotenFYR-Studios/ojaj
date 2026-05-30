package in.potenfyr.ojaj.commands;

import in.potenfyr.ojaj.ConfigManager;
import in.potenfyr.ojaj.OneJumpAllJump;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;

/**
 * Main admin command handler.
 */
public class OneJumpCommand implements CommandExecutor {

    private final OneJumpAllJump plugin;

    public OneJumpCommand(OneJumpAllJump plugin) {
        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(
            CommandSender sender,
            Command command,
            String label,
            String[] args
    ) {

        ConfigManager cfg = plugin.getConfigManager();

        /*
         * Permission check
         */
        if (!sender.hasPermission("onejump.admin")) {

            sender.sendMessage(
                    cfg.getMessage("no-permission")
            );

            return true;
        }

        /*
         * Help menu
         */
        if (args.length == 0) {

            sender.sendMessage("§6OneJumpAllJump Commands");
            sender.sendMessage("§e/onejump toggle");
            sender.sendMessage("§e/onejump reload");

            return true;
        }

        /*
         * Toggle plugin
         */
        if (args[0].equalsIgnoreCase("toggle")) {

            boolean enabled =
                    plugin.getConfig().getBoolean("enabled");

            plugin.getConfig().set(
                    "enabled",
                    !enabled
            );

            plugin.saveConfig();

            sender.sendMessage(
                    !enabled
                            ? cfg.getMessage("enabled")
                            : cfg.getMessage("disabled")
            );

            return true;
        }

        /*
         * Reload config
         */
        if (args[0].equalsIgnoreCase("reload")) {

            cfg.reload();

            sender.sendMessage(
                    cfg.getMessage("reloaded")
            );

            return true;
        }

        return true;
    }
}