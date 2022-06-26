package main.menu.body;

public class Part {
    private String partName;
    private double amount;
    private String unit;

    public Part() {
    }

    public Part(String partName, double amount, String unit) {
        this.partName = partName;
        this.amount = amount;
        this.unit = unit;
    }

    public String getPartName() {
        return partName;
    }

    public void setPartName(String partName) {
        this.partName = partName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
