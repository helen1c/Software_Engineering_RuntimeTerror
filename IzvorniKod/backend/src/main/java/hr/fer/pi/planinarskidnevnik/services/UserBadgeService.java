package hr.fer.pi.planinarskidnevnik.services;

import hr.fer.pi.planinarskidnevnik.models.Badge;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.models.UserBadge.UserBadge;

public interface UserBadgeService {

    public UserBadge addBadgeToUser(Badge badge, User user);

}
