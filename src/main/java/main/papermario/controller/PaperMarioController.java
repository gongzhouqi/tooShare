package main.papermario.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaperMarioController {

    @GetMapping("/paperMarioSolver")
    public String controller() {
        return "PaperMario/PaperMarioPuzzleSolver";
    }
}
