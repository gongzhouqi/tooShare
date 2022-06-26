package main.menu.service;

import main.menu.entity.Ingredient;

public interface IngredientService {
    Ingredient saveIngredient(Ingredient ingredient);

    Ingredient getIngredientById(int id);
}
