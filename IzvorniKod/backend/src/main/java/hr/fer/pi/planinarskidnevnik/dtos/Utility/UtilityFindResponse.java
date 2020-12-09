package hr.fer.pi.planinarskidnevnik.dtos.Utility;

public class UtilityFindResponse {

    private Long value;
    private String label;

    public Long getValue() {
        return value;
    }

    public String getLabel() {
        return label;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
