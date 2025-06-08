package blogging.blog.payloads;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PostDto {

    private Integer postId;
    private String postTitle;
    private String postContent;
    private Date addedDate;
    private UserDto user;
    private CategoryDto category;
    private List<CommentDto> comments = new ArrayList<>();
}
