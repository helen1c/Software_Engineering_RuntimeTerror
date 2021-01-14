package hr.fer.pi.planinarskidnevnik.exceptions;

public class LodgeAlreadyArchivedException extends RuntimeException {

    public LodgeAlreadyArchivedException(String message) {
        super(message);
    }
}
