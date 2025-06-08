package blogging.blog.services;

import java.util.List;

import blogging.blog.payloads.UserDto;

public interface UserServices {

    UserDto createUser(UserDto userDto);

    UserDto updateUser(UserDto userDto, Integer userId);

    UserDto getUserById(Integer userId);

    List<UserDto> getAllUsers();

    void deleteUser(Integer userId);
}
