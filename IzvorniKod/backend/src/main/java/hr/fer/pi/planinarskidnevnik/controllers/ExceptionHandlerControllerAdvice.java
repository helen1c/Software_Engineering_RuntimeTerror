package hr.fer.pi.planinarskidnevnik.controllers;

import hr.fer.pi.planinarskidnevnik.exceptions.*;
import hr.fer.pi.planinarskidnevnik.exceptions.IllegalAccessException;
import hr.fer.pi.planinarskidnevnik.exceptions.dtos.ConstraintViolationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataIntegrityViolationException;
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

    @ExceptionHandler(IllegalAccessException.class)
    public final ResponseEntity<?> handleIllegalAccessException(final Exception exception) {
        LOGGER.error(String.valueOf(exception));
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

    @ExceptionHandler(FriendshipRequestExistsException.class)
    public final ResponseEntity<?> handleFriendshipRequestExistsException(final Exception exception) {
        LOGGER.error("Friendship request exists!");
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler({MountainPathAlreadyExistsException.class})
    public ResponseEntity<String> handleException(final Exception exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler({
            MountainLodgeDoesNotExist.class,
            MountainPathDoesNotExist.class,
            MountainPathAlreadyAddedAsFavouriteException.class,
            PathAlreadyNonPrivateException.class,
    EventAttendanceException.class})
    public ResponseEntity<String> handlePathLodgeDoesNotExist(final Exception exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler({
            AuthorizationException.class,
            MountainPathPermissionException.class})
    public ResponseEntity<String> handleAuthException(final Exception exception) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exception.getMessage());
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    public ResponseEntity<String> handleIntegritiyException(final Exception exception) {
        return ResponseEntity.status(400).body("Dogodila se pogreška prilikom povezivanja s bazom podataka.");
    }

    @ExceptionHandler(LodgeAlreadyArchivedException.class)
    public final ResponseEntity<?> constraintsViolations(final Exception ex) {
        LOGGER.error("Constraint exception. " + ex.getMessage());
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

}
