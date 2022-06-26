package main.menu.service;

import main.menu.entity.Ingredient;
import main.menu.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class IngredientServiceImpl implements IngredientService {
    @Autowired
    private IngredientRepository repository;

    @Override
    public Ingredient saveIngredient(Ingredient ingredient) {
        Ingredient existence = repository.findDistinctByName(ingredient.getName());
        return Objects.requireNonNullElseGet(existence, () -> repository.save(ingredient));
    }

    @Override
    public Ingredient getIngredientById(int id) {
        Optional<Ingredient> ing = repository.findById(id);
        if (ing.isEmpty()) {
            return null;
        }
        return ing.get();
    }
}
