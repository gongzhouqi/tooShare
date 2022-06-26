package main.menu.body;

import static main.menu.util.ChineseComparator.getChineseComparator;

public class DishInfo implements Comparable<DishInfo> {
    private int dishId;
    private String dishName;

    public DishInfo() {
    }

    public DishInfo(int dishId, String dishName) {
        this.dishId = dishId;
        this.dishName = dishName;
    }

    public int getDishId() {
        return dishId;
    }

    public void setDishId(int dishId) {
        this.dishId = dishId;
    }

    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public int compareTo(DishInfo o) {
        return getChineseComparator().compare(this.dishName, o.dishName);
    }
}
