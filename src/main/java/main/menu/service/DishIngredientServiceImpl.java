package main.menu.service;

import main.menu.entity.DishIngredient;
import main.menu.repository.DishIngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class DishIngredientServiceImpl implements DishIngredientService {
    @Autowired
    private DishIngredientRepository repository;

    @Override
    public DishIngredient saveDishIngredient(DishIngredient dishIngredient) {
        return repository.save(dishIngredient);
    }

    @Override
    public void removeInvalidPairs(int dishId, Set<Integer> validIngredients) {
        List<DishIngredient> pairs = repository.findByDishId(dishId);
        for (DishIngredient pair : pairs) {
            if (!validIngredients.contains(pair.getIngredientId())) {
                repository.delete(pair);
            }
        }
    }

    @Override
    @Transactional
    public void deleteByDishId(int dishId) {
        List<DishIngredient> pairs = repository.findByDishId(dishId);
        repository.deleteAll(pairs);
    }

    @Override
    public List<DishIngredient> fetchDishIngredientsByDIshId(int dishId) {
        return repository.findByDishIdOrderByOrd(dishId);
    }
}
