package blogging.blog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import blogging.blog.entities.User;
import blogging.blog.payloads.JwtAuthRequest;
import blogging.blog.payloads.UserDto;
import blogging.blog.security.JwtAuthResponse;
import blogging.blog.services.UserServices;
import blogging.blog.utils.JwtTokenHelper;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserServices userService;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> createToken(
            @RequestBody JwtAuthRequest request
    ) {

        this.authenticate(request.getUsername(), request.getPassword());

        UserDetails userDetails = this.userDetailsService
                .loadUserByUsername(request.getUsername());

        String token = this.jwtTokenHelper.generateToken(userDetails);

        JwtAuthResponse response = new JwtAuthResponse();
        response.setJwtToken(token);
        response.setUserId(((User) userDetails).getId());

        return ResponseEntity.ok(response);
    }

    private void authenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authToken
                = new UsernamePasswordAuthenticationToken(username, password);
        try {
            authenticationManager.authenticate(authToken);
        } catch (DisabledException ex) {
            throw new RuntimeException("USER_DISABLED", ex);
        } catch (BadCredentialsException ex) {
            throw new RuntimeException("INVALID_CREDENTIALS", ex);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody @Valid UserDto userDto) {
        UserDto createdUser = userService.createUser(userDto);

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

}
