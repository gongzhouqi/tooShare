package main.menu.service;

import main.menu.entity.Dish;
import main.menu.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class DishServiceImpl implements DishService{

    @Autowired
    private DishRepository repository;

    @Override
    public Dish saveDish(Dish dish) {
        Dish existence = repository.findDistinctByName(dish.getName());
        // Save dish if no same name in repository
        return Objects.requireNonNullElseGet(existence, () -> repository.save(dish));
    }

    @Override
    public List<Dish> fetchDishList() {
        return repository.findAll();
    }

    @Override
    public Dish getDishById(Integer dishId) {
        Optional<Dish> dishInRep = repository.findById(dishId);
        if (dishInRep.isEmpty()) {
            return null;
        }
        return dishInRep.get();
    }

    @Override
    public Dish updateDish(Dish dish, Integer dishId) {
        Optional<Dish> dishInRep = repository.findById(dishId);

        if (dishInRep.isEmpty()) {
            return null;
        }

        Dish dishToUpdate = dishInRep.get();
        Dish existence = repository.findDistinctByName(dish.getName());

        if (existence != null && (!Objects.equals(existence.getId(), dishToUpdate.getId()))) {
            return existence;
        }

        dishToUpdate.setName(dish.getName());
        dishToUpdate.setStep(dish.getStep());
        dishToUpdate.setComments(dish.getComments());

        return repository.save(dishToUpdate);
    }

    @Override
    public boolean deleteDishById(Integer dishId) {
        Optional<Dish> dishInRep = repository.findById(dishId);
        if (dishInRep.isEmpty()) {
            return false;
        }
        repository.deleteById(dishId);
        return true;
    }

}