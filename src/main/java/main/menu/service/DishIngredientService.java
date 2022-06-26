package main.menu.service;

import main.menu.entity.DishIngredient;

import java.util.List;
import java.util.Set;

public interface DishIngredientService {
    DishIngredient saveDishIngredient(DishIngredient dishIngredient);

    void removeInvalidPairs(int dishId, Set<Integer> validIngredients);

    void deleteByDishId(int dishId);

    List<DishIngredient> fetchDishIngredientsByDIshId(int dishId);

}
