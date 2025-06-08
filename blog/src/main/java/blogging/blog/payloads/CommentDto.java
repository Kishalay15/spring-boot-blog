package blogging.blog.payloads;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CommentDto {

    private Integer commentId;

    @NotBlank
    @Size(min = 3, message = "Minimum 4 characters required")
    private String content;

    private Date addedDate;

    private Integer postId;

    private Integer userId;
}
