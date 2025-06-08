package blogging.blog.payloads;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CategoryDto {

    private Integer categoryId;

    @NotEmpty(message = "Category title cannot be empty")
    private String categoryTitle;

    @NotEmpty(message = "Category description cannot be empty")
    private String categoryDescription;
}
