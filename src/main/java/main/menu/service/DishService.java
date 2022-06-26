package main.menu.service;

import main.menu.entity.Dish;

import java.util.List;

public interface DishService {
    Dish saveDish(Dish dish);

    List<Dish> fetchDishList();

    Dish getDishById(Integer dishId);

    Dish updateDish(Dish dish, Integer dishId);

    boolean deleteDishById(Integer dishId);
}
