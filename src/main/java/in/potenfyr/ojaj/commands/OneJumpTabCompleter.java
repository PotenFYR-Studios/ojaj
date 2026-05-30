package in.potenfyr.ojaj.commands;

import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabCompleter;

import java.util.ArrayList;
import java.util.List;

public class OneJumpTabCompleter
        implements TabCompleter {

    @Override
    public List<String> onTabComplete(
            CommandSender sender,
            Command command,
            String alias,
            String[] args
    ) {

        List<String> completions =
                new ArrayList<>();

        if (args.length == 1) {

            completions.add("toggle");
            completions.add("reload");
            completions.add("stats");
        }

        return completions;
    }
}