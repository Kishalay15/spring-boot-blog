package blogging.blog.services;

import java.util.List;

import blogging.blog.payloads.CommentCreateDto;
import blogging.blog.payloads.CommentDto;

public interface CommentServices {

    CommentDto createComment(CommentCreateDto commentCreateDto);

    List<CommentDto> getAllComments();

    List<CommentDto> getCommentsByUser(Integer userId);

    List<CommentDto> getCommentsByPost(Integer postId);

    void deleteComment(Integer commentId);

    CommentDto getCommentById(Integer commentId);

    // CommentDto updateComment(CommentDto commentDto, Integer commentId);

}
