package main.menu.util;


import java.text.Collator;
import java.util.Comparator;
import java.util.Locale;

public class ChineseComparator {

    private static Comparator<Object> singleton;
    public static Comparator<Object> getChineseComparator() {
        if (singleton == null) {
            singleton = Collator.getInstance(Locale.CHINA);
        }
        return singleton;
    }
}
