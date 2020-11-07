package hr.fer.pi.planinarskidnevnik.validation.email;

import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.services.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Optional;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    @Autowired
    private UserService service;
    private boolean uniqueUser;
    private Authentication authentication;


    @Override
    public void initialize(UniqueEmail constraintAnnotation) {
        this.uniqueUser = constraintAnnotation.uniqueUser();
        this.authentication = SecurityContextHolder.getContext().getAuthentication();
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {
        if (uniqueUser && authentication.getPrincipal() != null) {
            final Optional<User> user = service.findByEmail(authentication.getPrincipal().toString());
            if (user.isEmpty()) {
                return false;
            }
            if (service.existsUserWithEmailAndNotId(email, user.get().getId())) {
                constraintValidatorContext.disableDefaultConstraintViolation();
                constraintValidatorContext
                        .buildConstraintViolationWithTemplate("Korisnik s e-mailom već postoji.")
                        .addConstraintViolation();
                return false;
            }
        } else if (!service.findByEmail(email).isEmpty()) {
            constraintValidatorContext.disableDefaultConstraintViolation();
            constraintValidatorContext
                    .buildConstraintViolationWithTemplate("Korisnik s e-mailom već postoji.")
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}