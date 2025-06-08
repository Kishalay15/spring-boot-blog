package blogging.blog.security;

import lombok.Data;

@Data
public class JwtAuthResponse {

    private String jwtToken;

    private Integer userId;
}
