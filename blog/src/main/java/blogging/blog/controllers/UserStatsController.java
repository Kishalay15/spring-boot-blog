package blogging.blog.controllers;

import blogging.blog.repositories.CommentRepo;
import blogging.blog.repositories.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserStatsController {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private CommentRepo commentRepo;

    @GetMapping("/{userId}/posts/count")
    public ResponseEntity<Map<String, Long>> getPostCount(@PathVariable Integer userId) {

        long count = postRepo.countByUser_Id(userId);

        System.out.println("Post count for user " + userId + ": " + count);

        return new ResponseEntity<>(Collections.singletonMap("count", count),HttpStatus.OK);
    }

    @GetMapping("/{userId}/comments/count")
    public ResponseEntity<Map<String, Long>> getCommentCount(@PathVariable Integer userId) {

        long count = commentRepo.countByUser_Id(userId);

        return new ResponseEntity<>(Collections.singletonMap("count", count),HttpStatus.OK);
    }
}
