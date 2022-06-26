package main.menu.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import main.menu.entity.Dish;
import org.springframework.stereotype.Repository;

@Repository
public interface DishRepository extends JpaRepository<Dish, Integer> {
    public Dish findDistinctByName(String name);
}
