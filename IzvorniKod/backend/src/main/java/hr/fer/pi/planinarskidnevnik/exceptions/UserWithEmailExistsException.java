package hr.fer.pi.planinarskidnevnik.exceptions;

public class UserWithEmailExistsException extends RuntimeException {
    public UserWithEmailExistsException(String message) {
        super(message);
    }
}
