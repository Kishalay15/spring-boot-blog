package blogging.blog.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailNotfound extends RuntimeException {

    private String resourceName;
    private String fieldName;
    private String emailString;

    public EmailNotfound(String resourceName, String fieldName, String emailString) {

        super(String.format("%s not found with %s : %s", resourceName, fieldName, emailString));

        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.emailString = emailString;

    }

}
