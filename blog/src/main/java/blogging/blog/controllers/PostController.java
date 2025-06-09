package blogging.blog.controllers;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import blogging.blog.config.AppConstants;
import blogging.blog.entities.Category;
import blogging.blog.entities.User;
import blogging.blog.exceptions.ResourceNotFoundException;
import blogging.blog.payloads.CategoryDto;
import blogging.blog.payloads.PostCreateDto;
import blogging.blog.payloads.PostDto;
import blogging.blog.payloads.PostResponse;
import blogging.blog.payloads.UserDto;
import blogging.blog.repositories.CategoryRepo;
import blogging.blog.repositories.UserRepo;
import blogging.blog.services.PostServices;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostServices postServices;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/user/{userId}/category/{categoryId}/posts")
    public ResponseEntity<PostDto> createPost(
            @Valid @RequestBody PostCreateDto postCreateDto,
            @PathVariable Integer userId,
            @PathVariable Integer categoryId) {

        postCreateDto.setUserId(userId);
        postCreateDto.setCategoryId(categoryId);

        PostDto createdPost = this.postServices.createPost(postCreateDto);

        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @PutMapping("/user/{userId}/category/{categoryId}/posts/{postId}")
    public ResponseEntity<PostDto> updatePost(
            @Valid @RequestBody PostDto postdto,
            @PathVariable Integer postId,
            @PathVariable Integer userId,
            @PathVariable Integer categoryId) {

        User user = this.userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Category category = this.categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        postdto.setUser(this.modelMapper.map(user, UserDto.class));
        postdto.setCategory(this.modelMapper.map(category, CategoryDto.class));

        PostDto updatedPost = this.postServices.updatePost(postdto, postId);

        return new ResponseEntity<>(updatedPost, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/posts")
    public ResponseEntity<List<PostCreateDto>> getPostsByUser(
            @PathVariable Integer userId) {

        List<PostCreateDto> userPosts = this.postServices.getPostsByUser(userId);

        return new ResponseEntity<>(userPosts, HttpStatus.OK);
    }

    @GetMapping("/category/{categoryId}/posts")
    public ResponseEntity<List<PostCreateDto>> getPostsByCategory(
            @PathVariable Integer categoryId) {
        List<PostCreateDto> categoryPosts = this.postServices.getPostsByCategory(categoryId);
        return new ResponseEntity<>(categoryPosts, HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<PostResponse> getAllPosts(
            @RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy) {

        PostResponse allPosts = this.postServices.getAllPosts(pageNumber, pageSize, sortBy);

        return new ResponseEntity<>(allPosts, HttpStatus.OK);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<PostDto> getPostById(
            @PathVariable Integer postId) {
        PostDto postById = this.postServices.getPostById(postId);
        return new ResponseEntity<>(postById, HttpStatus.OK);
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<?> deletePost(
            @PathVariable Integer postId) {

        PostDto postDto = this.postServices.getPostById(postId);

        this.postServices.deletePost(postId);
        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/category/{categoryId}/posts/view")
    public ResponseEntity<List<PostCreateDto>> getUserPostsByCategory(

            @PathVariable Integer userId,
            @PathVariable Integer categoryId) {

        List<PostCreateDto> categoryPosts = this.postServices.getUserPostsByCategory(userId, categoryId);

        return new ResponseEntity<>(categoryPosts, HttpStatus.OK);
    }

    @GetMapping("/posts/search/{keyword}")
    public ResponseEntity<List<PostCreateDto>> searchByPostTitle(
            @PathVariable String keyword) {
        List<PostCreateDto> result = this.postServices.searchPosts(keyword);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
