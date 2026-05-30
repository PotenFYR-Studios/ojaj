package in.potenfyr.ojaj.utils;

import org.bukkit.ChatColor;

public class ColorUtil {

    public static String color(String text) {

        if (text == null) {
            return "";
        }

        return ChatColor.translateAlternateColorCodes(
                '&',
                text
        );
    }
}