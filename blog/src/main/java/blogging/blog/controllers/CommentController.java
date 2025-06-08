package blogging.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import blogging.blog.payloads.CommentCreateDto;
import blogging.blog.payloads.CommentDto;
import blogging.blog.services.CommentServices;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    private CommentServices commentServices;

    @PostMapping("/users/{userId}/posts/{postId}/comments")
    public ResponseEntity<CommentDto> createComment(
            @Valid @RequestBody CommentCreateDto commentCreateDto,
            @PathVariable Integer userId,
            @PathVariable Integer postId) {

        commentCreateDto.setUserId(userId);
        commentCreateDto.setPostId(postId);

        CommentDto commentDto = commentServices.createComment(commentCreateDto);

        return new ResponseEntity<>(commentDto, HttpStatus.CREATED);
    }

    @GetMapping("/comments")
    public ResponseEntity<List<CommentDto>> getAllComments() {

        List<CommentDto> commentDtos = this.commentServices.getAllComments();

        return new ResponseEntity<>(commentDtos, HttpStatus.OK);
    }

    @GetMapping("/users/{userId}/comments")
    public ResponseEntity<List<CommentDto>> getAllCommentsByUser(
            @PathVariable Integer userId) {

        List<CommentDto> commentDtos = this.commentServices.getCommentsByUser(userId);

        return new ResponseEntity<>(commentDtos, HttpStatus.OK);

    }

    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<List<CommentDto>> getAllCommentsByPost(
            @PathVariable Integer postId) {

        List<CommentDto> commentDtos = this.commentServices.getCommentsByPost(postId);

        return new ResponseEntity<>(commentDtos, HttpStatus.OK);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Integer commentId) {

        CommentDto commentDto = this.commentServices.getCommentById(commentId);

        this.commentServices.deleteComment(commentId);

        return new ResponseEntity<>(commentDto, HttpStatus.OK);
    }

    @GetMapping("/comments/{commentId}")
    public ResponseEntity<CommentDto> getCommentById(
            @PathVariable Integer commentId) {

        CommentDto commentDto = this.commentServices.getCommentById(commentId);

        return new ResponseEntity<>(commentDto, HttpStatus.OK);
    }
}
