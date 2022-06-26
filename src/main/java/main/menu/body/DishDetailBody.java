package main.menu.body;

public class DishDetailBody {

    private int id;
    private String name;
    private String[] step;
    private String comments;
    private Part[] parts;

    public DishDetailBody() {
    }

    public DishDetailBody(int id, String name, String[] step, String comments, Part[] parts) {
        this.id = id;
        this.name = name;
        this.step = step;
        this.comments = comments;
        this.parts = parts;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getStep() {
        return step;
    }

    public void setStep(String[] step) {
        this.step = step;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Part[] getParts() {
        return parts;
    }

    public void setParts(Part[] parts) {
        this.parts = parts;
    }
}
