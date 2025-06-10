package blogging.blog.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import blogging.blog.entities.Category;
import blogging.blog.entities.Post;
import blogging.blog.entities.User;

public interface PostRepo extends JpaRepository<Post, Integer> {

    List<Post> findByUser(User user);

    List<Post> findByCategory(Category category);

    List<Post> findByPostTitleContaining(String keyword);

    long countByUser_Id(Integer userId);

}
