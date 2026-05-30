package in.potenfyr.ojaj.utils;

import java.util.concurrent.ThreadLocalRandom;

public class RandomUtil {

    public static double randomDouble(double min, double max) {

        return ThreadLocalRandom.current()
                .nextDouble(min, max);
    }

    public static int randomInt(int min, int max) {

        return ThreadLocalRandom.current()
                .nextInt(min, max + 1);
    }
}