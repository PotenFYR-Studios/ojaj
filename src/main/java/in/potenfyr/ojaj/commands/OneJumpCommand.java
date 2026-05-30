package in.potenfyr.ojaj.commands;

import in.potenfyr.ojaj.OneJumpAllJump;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;

public class OneJumpCommand
        implements CommandExecutor {

    private final OneJumpAllJump plugin;

    public OneJumpCommand(
            OneJumpAllJump plugin
    ) {

        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(
            CommandSender sender,
            Command command,
            String label,
            String[] args
    ) {

        /*
         * Permission check
         */
        if (!sender.hasPermission(
                "onejump.admin"
        )) {

            sender.sendMessage(
                    "§cNo permission."
            );

            return true;
        }

        /*
         * Help menu
         */
        if (args.length == 0) {

            sender.sendMessage(
                    "§6OneJumpAllJump Commands"
            );

            sender.sendMessage(
                    "§e/onejump toggle"
            );

            sender.sendMessage(
                    "§e/onejump reload"
            );

            sender.sendMessage(
                    "§e/onejump stats"
            );

            return true;
        }

        /*
         * Toggle plugin
         */
        if (args[0].equalsIgnoreCase(
                "toggle"
        )) {

            boolean enabled =
                    plugin.getConfig()
                            .getBoolean(
                                    "enabled"
                            );

            plugin.getConfig().set(
                    "enabled",
                    !enabled
            );

            plugin.saveConfig();

            plugin.getConfigManager()
                    .reload();

            sender.sendMessage(
                    !enabled
                            ? "§aPlugin enabled."
                            : "§cPlugin disabled."
            );

            return true;
        }

        /*
         * Reload config
         */
        if (args[0].equalsIgnoreCase(
                "reload"
        )) {

            plugin.getConfigManager()
                    .reload();

            sender.sendMessage(
                    "§aConfiguration reloaded."
            );

            return true;
        }

        /*
         * Stats command
         */
        if (args[0].equalsIgnoreCase(
                "stats"
        )) {

            if (!(sender instanceof org.bukkit.entity.Player player)) {

                sender.sendMessage(
                        "§cOnly players can use this."
                );

                return true;
            }

            int jumps = plugin.getStatsManager()
                    .getJumps(
                            player.getUniqueId()
                    );

            sender.sendMessage(
                    "§6=== OneJump Stats ==="
            );

            sender.sendMessage(
                    "§eTracked jumps: §f" + jumps
            );

            return true;
        }        return true;
    }
}