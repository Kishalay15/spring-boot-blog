package blogging.blog.services;

import java.util.Date;
import java.util.List;

// import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blogging.blog.entities.Comment;
import blogging.blog.entities.Post;
import blogging.blog.entities.User;
import blogging.blog.exceptions.ResourceNotFoundException;
import blogging.blog.payloads.CommentCreateDto;
import blogging.blog.payloads.CommentDto;
// import blogging.blog.payloads.PostCreateDto;
import blogging.blog.repositories.CommentRepo;
import blogging.blog.repositories.PostRepo;
import blogging.blog.repositories.UserRepo;

@Service
public class CommentServiceImpl implements CommentServices {

    @Autowired
    private CommentRepo commentRepo;

    // @Autowired
    // private ModelMapper modelMapper;

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public CommentDto createComment(CommentCreateDto commentCreateDto) {

        Post post = this.postRepo.findById(commentCreateDto.getPostId())
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", commentCreateDto.getPostId()));

        User user = this.userRepo.findById(commentCreateDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", commentCreateDto.getUserId()));

        Comment comment = new Comment();
        comment.setContent(commentCreateDto.getContent());
        comment.setPost(post);
        comment.setUser(user);
        comment.setAddedDate(new Date());

        Comment savedComment = this.commentRepo.save(comment);

        return entityToDto(savedComment);
    }

    @Override
    public List<CommentDto> getAllComments() {

        List<Comment> comments = this.commentRepo.findAll();
        List<CommentDto> commentDtos = comments.stream().map(comment -> this.entityToDto(comment)).toList();

        return commentDtos;
    }

    @Override
    public List<CommentDto> getCommentsByUser(Integer userId) {
        User user = this.userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        List<Comment> comments = this.commentRepo.findByUser(user);
        List<CommentDto> commentDtos = comments.stream().map(comment -> this.entityToDto(comment)).toList();

        return commentDtos;
    }

    @Override
    public List<CommentDto> getCommentsByPost(Integer postId) {
        Post post = this.postRepo.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));

        List<Comment> comments = this.commentRepo.findByPost(post);
        List<CommentDto> commentDtos = comments.stream().map(comment -> this.entityToDto(comment)).toList();

        return commentDtos;
    }

    @Override
    public void deleteComment(Integer commentId) {
        Comment comment = this.commentRepo.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", commentId));

        this.commentRepo.delete(comment);
    }

    @Override
    public CommentDto getCommentById(Integer commentId) {
        Comment comment = this.commentRepo.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", commentId));

        return this.entityToDto(comment);
    }

    private CommentDto entityToDto(Comment comment) {

        CommentDto commentDto = new CommentDto();
        commentDto.setCommentId(comment.getCommentId());
        commentDto.setContent(comment.getContent());
        commentDto.setAddedDate(comment.getAddedDate());
        commentDto.setPostId(comment.getPost().getPostId());
        commentDto.setUserId(comment.getUser().getId());

        return commentDto;
    }

    // private PostCreateDto entityToPostCreateDto(Post post) {

    // List<Comment> comments = post.getComments();
    // List<CommentDto> commentDtos = comments.stream().map(comment ->
    // this.entityToDto(comment)).toList();

    // PostCreateDto pcdto = new PostCreateDto();
    // pcdto.setPostId(post.getPostId());
    // pcdto.setPostTitle(post.getPostTitle());
    // pcdto.setPostContent(post.getPostContent());
    // pcdto.setUserId(post.getUser().getId());
    // pcdto.setCategoryId(post.getCategory().getCategoryId());
    // pcdto.setComments(commentDtos);

    // return pcdto;
    // }

}
