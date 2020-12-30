package hr.fer.pi.planinarskidnevnik.services.impl;

import hr.fer.pi.planinarskidnevnik.models.Badge;
import hr.fer.pi.planinarskidnevnik.models.User;
import hr.fer.pi.planinarskidnevnik.models.UserBadge.UserBadge;
import hr.fer.pi.planinarskidnevnik.repositories.BadgeUserRepository;
import hr.fer.pi.planinarskidnevnik.services.UserBadgeService;
import org.springframework.stereotype.Service;

@Service
public class UserBadgeServiceImpl implements UserBadgeService {

    private final BadgeUserRepository badgeUserRepository;

    public UserBadgeServiceImpl(BadgeUserRepository badgeUserRepository) {
        this.badgeUserRepository = badgeUserRepository;
    }

    @Override
    public UserBadge addBadgeToUser(Badge badge, User user) {
        return badgeUserRepository.save(new UserBadge(user, badge));
    }
}
