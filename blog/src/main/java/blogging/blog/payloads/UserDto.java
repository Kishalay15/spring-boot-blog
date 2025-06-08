package blogging.blog.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {

    private Integer id;

    @NotEmpty(message = "Name cannot be Empty")
    private String name;

    @Email(message = "Email address is not valid")
    private String email;

    @NotEmpty(message = "Password cannot be Empty")
    @Size(min = 6, max = 13, message = "Password must be min of 6 chars and max of 13 chars")
    private String password;

    @NotEmpty
    private String about;
}
