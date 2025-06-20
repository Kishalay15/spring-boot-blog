package blogging.blog.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import blogging.blog.entities.User;
import blogging.blog.exceptions.EmailNotfound;
import blogging.blog.repositories.UserRepo;

@Service
public class CustomUserDetailServices implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = this.userRepo.findByEmail(username)
                .orElseThrow(() -> new EmailNotfound("User", "email", username));

        return user;
    }

}
