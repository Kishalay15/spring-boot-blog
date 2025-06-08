package blogging.blog.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import blogging.blog.entities.Comment;
import blogging.blog.entities.Post;
import blogging.blog.entities.User;

public interface CommentRepo extends JpaRepository<Comment, Integer> {

    List<Comment> findByPost(Post post);

    List<Comment> findByUser(User user);
}
