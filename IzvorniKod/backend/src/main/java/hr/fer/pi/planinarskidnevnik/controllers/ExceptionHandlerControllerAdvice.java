package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.exceptions.ResourceNotFoundException;
import hr.fer.pi.planinarskidnevnik.exceptions.UserWithEmailExistsException;
import hr.fer.pi.planinarskidnevnik.exceptions.dtos.ConstraintViolationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.LinkedList;
import java.util.List;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class ExceptionHandlerControllerAdvice {
    private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionHandlerControllerAdvice.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> validationExceptionHandler(final MethodArgumentNotValidException exception) {
        final BindingResult result = exception.getBindingResult();
        final List<ConstraintViolationDto> constraintViolationDtos = new LinkedList<>();
        for (final FieldError error : result.getFieldErrors()) {
            constraintViolationDtos.add(new ConstraintViolationDto(error.getField(), error.getDefaultMessage()));
        }
        return ResponseEntity.badRequest().body(constraintViolationDtos);
    }

    @ExceptionHandler({UsernameNotFoundException.class})
    public final ResponseEntity<?> handleUsernameNotFoundException(final Exception exception) {
        LOGGER.error("Error during user fetching: {}", exception.getMessage());
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public final ResponseEntity<?> handleNotFoundException(final ResourceNotFoundException exception) {
        LOGGER.error(String.valueOf(exception));
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserWithEmailExistsException.class)
    public final ResponseEntity<?> handleUsernameWithEmailAlreadyExistsException(final Exception exception) {
        LOGGER.error("User with email already exists!");
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

}
