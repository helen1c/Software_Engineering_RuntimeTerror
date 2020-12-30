package hr.fer.pi.planinarskidnevnik.exceptions;

public class MountainLodgeDoesNotExist extends RuntimeException {
    public MountainLodgeDoesNotExist(String message) {
        super(message);
    }
}
