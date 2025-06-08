package blogging.blog.services;

import java.util.List;

import blogging.blog.payloads.PostCreateDto;
import blogging.blog.payloads.PostDto;
import blogging.blog.payloads.PostResponse;

public interface PostServices {

    PostDto createPost(PostCreateDto postCreateDto);

    PostDto updatePost(PostDto postDto, Integer postId);

    void deletePost(Integer postId);

    PostResponse getAllPosts(Integer pageNumnber, Integer pageSize, String sortBy);

    PostDto getPostById(Integer postId);

    List<PostCreateDto> getPostsByCategory(Integer categoryId);

    List<PostCreateDto> getPostsByUser(Integer userId);

    List<PostCreateDto> searchPosts(String keyword);

    List<PostCreateDto> getUserPostsByCategory(Integer userId, Integer categoryId);
}
