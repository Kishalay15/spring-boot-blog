package blogging.blog.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import blogging.blog.config.AppConstants;
import blogging.blog.entities.Role;
import blogging.blog.entities.User;
import blogging.blog.exceptions.ResourceNotFoundException;
import blogging.blog.payloads.UserDto;
import blogging.blog.repositories.RoleRepo;
import blogging.blog.repositories.UserRepo;

@Service
public class UserServiceImpl implements UserServices {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {

        User user = dtoToEntity(userDto);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        Role role = roleRepo.findById(AppConstants.ROLE_NORMAL)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", AppConstants.ROLE_NORMAL));

        user.getRoles().add(role);

        User saved = this.userRepo.save(user);

        return entityToDto(saved);
    }

    @Override
    public UserDto updateUser(UserDto userDto, Integer userId) {

        User oldUser = this.userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        oldUser.setName(userDto.getName());
        oldUser.setEmail(userDto.getEmail());
        oldUser.setPassword(userDto.getPassword());
        oldUser.setAbout(userDto.getAbout());
        User updatedUser = this.userRepo.save(oldUser);

        return entityToDto(updatedUser);
    }

    @Override
    public UserDto getUserById(Integer userId) {

        User user = this.userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        return entityToDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {

        List<User> users = this.userRepo.findAll();
        List<UserDto> userDtos = users.stream().map(user -> this.entityToDto(user)).toList();

        return userDtos;
    }

    @Override
    public void deleteUser(Integer userId) {

        User user = this.userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        this.userRepo.delete(user);
    }

    public User dtoToEntity(UserDto userdto) {
        // User user = new User();
        // user.setId(userdto.getId());
        // user.setName(userdto.getName());
        // user.setEmail(userdto.getEmail());
        // user.setPassword(userdto.getPassword());
        // user.setAbout(userdto.getAbout());

        User user = this.modelMapper.map(userdto, User.class);

        return user;
    }

    public UserDto entityToDto(User user) {
        // UserDto userdto = new UserDto();
        // userdto.setId(user.getId());
        // userdto.setName(user.getName());
        // userdto.setEmail(user.getEmail());
        // userdto.setPassword(user.getPassword());
        // userdto.setAbout(user.getAbout());

        UserDto userdto = this.modelMapper.map(user, UserDto.class);

        return userdto;
    }

}
