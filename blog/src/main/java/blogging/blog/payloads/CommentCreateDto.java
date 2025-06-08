package blogging.blog.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CommentCreateDto {

    private Integer commentId;

    @NotBlank
    @Size(min = 3, message = "Minimum 4 characters required")
    private String content;

    private Integer postId;

    private Integer userId;

}
