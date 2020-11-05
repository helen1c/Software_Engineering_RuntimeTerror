package hr.fer.pi.planinarskidnevnik.exceptions.dtos;

import java.io.Serializable;
import java.util.Objects;

public class ConstraintViolationDto implements Serializable {
    private String fieldName;
    private String message;

    public ConstraintViolationDto(String fieldName, String message) {
        this.fieldName = fieldName;
        this.message = message;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        hr.fer.pi.planinarskidnevnik.exceptions.dtos.ConstraintViolationDto that = (hr.fer.pi.planinarskidnevnik.exceptions.dtos.ConstraintViolationDto) o;
        return Objects.equals(fieldName, that.fieldName) &&
                Objects.equals(message, that.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fieldName, message);
    }

    @Override
    public String toString() {
        return "ConstraintViolationDto{" +
                "constraintName='" + fieldName + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
