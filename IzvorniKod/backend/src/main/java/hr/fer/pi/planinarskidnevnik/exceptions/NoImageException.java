package hr.fer.pi.planinarskidnevnik.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "/images/default-image.jpg")
public class NoImageException extends RuntimeException {
}