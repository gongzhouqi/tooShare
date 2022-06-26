package main.menu.repository;

import main.menu.entity.DishIngredient;
import main.menu.entity.DishIngredientId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DishIngredientRepository extends JpaRepository<DishIngredient, DishIngredientId> {

    List<DishIngredient> findByDishId(int dishId);

    List<DishIngredient> findByDishIdOrderByOrd(int dishId);

}
