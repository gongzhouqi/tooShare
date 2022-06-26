package main.menu.controller;

import main.menu.body.DishDetailBody;
import main.menu.body.DishesMetaBody;
import main.menu.body.Part;
import main.menu.entity.Dish;
import main.menu.entity.DishIngredient;
import main.menu.entity.Ingredient;
import main.menu.service.DishIngredientService;
import main.menu.service.DishService;
import main.menu.service.IngredientService;
import main.menu.util.ChineseComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static main.menu.constant.StepDelimiter.DELIMITER;


@Controller
@RequestMapping("/menu")
public class BasicController {

    @Autowired
    private DishService dishService;

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private DishIngredientService dishIngredientService;

    @GetMapping
    public String page() {
        return "Menu/Menu";
    }

    @GetMapping(path = "poc")
    public @ResponseBody String poc() {
        String[] a = {"中山", "汕头", "广州", "安庆", "阳江", "南京", "武汉", "北京", "安阳", "北方", "爱心", "a", "b", "c", "d", "av", "ab", "ac", "ad"};
        List<String> ls = Arrays.asList(a);
        ls.sort(ChineseComparator.getChineseComparator());
        return ls.toString();
    }

    @PostMapping(path="/add")
    public @ResponseBody int addNewDish (@RequestBody DishDetailBody body) {
        Dish d = new Dish();
        d.setName(body.getName());
        if (body.getStep() != null) {
            d.setStep(String.join(DELIMITER, body.getStep()));
        }
        d.setComments(body.getComments());
        Dish savedDish = dishService.saveDish(d);
        if (savedDish != d) {
            return -1;
        }
        writePartsToDish(body.getParts(), d);
        return d.getId();
    }

    // TODO: Assumes no duplicate ingredients
    @PostMapping(path="/edit/{id}")
    public @ResponseBody int editDish (@PathVariable int id, @RequestBody DishDetailBody body) {
        Dish d = new Dish();
        d.setName(body.getName());
        if (body.getStep() != null) {
            d.setStep(String.join(DELIMITER, body.getStep()));
        }
        d.setComments(body.getComments());
        Dish savedDish = dishService.updateDish(d, id);
        if (savedDish == null) {
            return -2;
        } else if (savedDish.getId() != id) {
            return -1;
        }
        Set<Integer> allIngredients = writePartsToDish(body.getParts(), savedDish);
        dishIngredientService.removeInvalidPairs(id, allIngredients);
        return savedDish.getId();
    }

    @DeleteMapping(path="/delete/{id}")
    public @ResponseBody int deleteDish (@PathVariable int id) {
        boolean exist = dishService.deleteDishById(id);
        if (!exist) {
            return -1;
        }
        dishIngredientService.deleteByDishId(id);
        return 0;
    }

    @GetMapping(path="/dishes")
    public @ResponseBody DishesMetaBody getAllDishes() {
        DishesMetaBody dr = new DishesMetaBody();
        List<Dish> allDishes = dishService.fetchDishList();
        allDishes.forEach(dr::addDish);
        Collections.sort(dr.getInfoList());
        return dr;
    }

    @GetMapping(path="/dish/{id}")
    public @ResponseBody DishDetailBody getDish(@PathVariable int id) {
        Dish d = dishService.getDishById(id);
        if (d == null) {
            return null;
        }
        DishDetailBody body = new DishDetailBody();
        body.setId(d.getId());
        body.setName(d.getName());
        if (d.getStep() == null) {
            body.setStep(new String[0]);
        } else {
            body.setStep(d.getStep().split(DELIMITER));
        }
        body.setComments(d.getComments());

        List<DishIngredient> allDishIngredients = dishIngredientService.fetchDishIngredientsByDIshId(id);
        Part[] parts = allDishIngredients.stream().map(di -> {
            Ingredient ing = ingredientService.getIngredientById(di.getIngredientId());
            Part part = new Part();
            part.setPartName(ing.getName());
            part.setAmount(di.getAmount());
            part.setUnit(di.getUnit());
            return part;
        }).toList().toArray(new Part[0]);
        body.setParts(parts);

        return body;
    }

    private Set<Integer> writePartsToDish(Part[] parts, Dish d) {
        Set<Integer> allIngredients = new HashSet<>();
        if (parts == null) {
            return allIngredients;
        }
        for (int i = 0; i < parts.length; i++) {
            Part p = parts[i];
            Ingredient ing = new Ingredient();
            ing.setName(p.getPartName());
            ing = ingredientService.saveIngredient(ing);
            allIngredients.add(ing.getId());

            DishIngredient di = new DishIngredient();
            di.setDishId(d.getId());
            di.setIngredientId(ing.getId());
            di.setAmount(p.getAmount());
            di.setUnit(p.getUnit());
            di.setOrd(i);
            dishIngredientService.saveDishIngredient(di);
        }
        return allIngredients;
    }

}
