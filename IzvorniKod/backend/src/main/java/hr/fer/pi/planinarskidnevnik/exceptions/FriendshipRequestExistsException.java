package hr.fer.pi.planinarskidnevnik.exceptions;

public class FriendshipRequestExistsException extends RuntimeException{
    public FriendshipRequestExistsException(String message) {
        super(message);
    }
}
