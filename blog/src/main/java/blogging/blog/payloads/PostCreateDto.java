package blogging.blog.payloads;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PostCreateDto {

    private Integer postId;

    @NotEmpty(message = "Post title cannot be empty")
    private String postTitle;

    @NotEmpty
    @Size(min = 10, message = "Post content must be minimum 10 characters")
    private String postContent;

    private Date addedDate;

    private Integer userId;
    private Integer categoryId;

    private List<CommentDto> comments = new ArrayList<>();
}
