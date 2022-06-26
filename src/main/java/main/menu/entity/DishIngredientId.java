package main.menu.entity;

import java.io.Serializable;
import java.util.Objects;

public class DishIngredientId implements Serializable {
    private int dishId;

    private int ingredientId;

    public int getDishId() {
        return dishId;
    }

    public void setDishId(int dishId) {
        this.dishId = dishId;
    }

    public int getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(int ingredientId) {
        this.ingredientId = ingredientId;
    }

    public DishIngredientId() {
    }

    public DishIngredientId(int dishId, int ingredientId) {
        this.dishId = dishId;
        this.ingredientId = ingredientId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DishIngredientId that = (DishIngredientId) o;
        return dishId == that.dishId && ingredientId == that.ingredientId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(dishId, ingredientId);
    }
}