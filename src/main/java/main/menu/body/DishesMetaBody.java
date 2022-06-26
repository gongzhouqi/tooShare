package main.menu.body;

import main.menu.entity.Dish;

import java.util.ArrayList;
import java.util.List;

public class DishesMetaBody {
    private List<DishInfo> infoList;

    public DishesMetaBody() {
        this.infoList = new ArrayList<>();
    }

    public DishesMetaBody(List<DishInfo> infoList) {
        this.infoList = infoList;
    }

    public List<DishInfo> getInfoList() {
        return infoList;
    }

    public void setInfoList(List<DishInfo> infoList) {
        this.infoList = infoList;
    }

    public void addDish(Dish d) {
        infoList.add(new DishInfo(d.getId(), d.getName()));
    }
}
