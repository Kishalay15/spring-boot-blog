package blogging.blog.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import blogging.blog.entities.Category;
import blogging.blog.entities.Comment;
import blogging.blog.entities.Post;
import blogging.blog.entities.User;
import blogging.blog.exceptions.ResourceNotFoundException;
import blogging.blog.payloads.CommentDto;
import blogging.blog.payloads.PostCreateDto;
import blogging.blog.payloads.PostDto;
import blogging.blog.payloads.PostResponse;
import blogging.blog.repositories.CategoryRepo;
import blogging.blog.repositories.PostRepo;
import blogging.blog.repositories.UserRepo;

@Service
public class PostServiceImpl implements PostServices {

        @Autowired
        private PostRepo postRepo;

        @Autowired
        private ModelMapper modelMapper;

        @Autowired
        private UserRepo userRepo;

        @Autowired
        private CategoryRepo categoryRepo;

        @Override
        public PostDto createPost(PostCreateDto postCreateDto) {

                User user = this.userRepo.findById(postCreateDto.getUserId())
                                .orElseThrow(() -> new ResourceNotFoundException("User", "id",
                                                postCreateDto.getUserId()));

                Category category = this.categoryRepo.findById(postCreateDto.getCategoryId())
                                .orElseThrow(() -> new ResourceNotFoundException("Category", "id",
                                                postCreateDto.getCategoryId()));

                Post post = new Post();
                post.setPostTitle(postCreateDto.getPostTitle());
                post.setPostContent(postCreateDto.getPostContent());
                post.setAddedDate(new Date());
                post.setUser(user);
                post.setCategory(category);

                Post savedPost = this.postRepo.save(post);

                return this.modelMapper.map(savedPost, PostDto.class);
        }

        @Override
        public PostDto updatePost(PostDto postDto, Integer postId) {

                Post post = this.postRepo.findById(postId)
                                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));

                if (postDto.getCategory() != null) {
                        post.setCategory(modelMapper.map(postDto.getCategory(), Category.class));
                }
                post.setPostContent(postDto.getPostContent());
                post.setPostTitle(postDto.getPostTitle());
                post.setAddedDate(new Date());

                Post updatedPost = this.postRepo.save(post);

                return this.modelMapper.map(updatedPost, PostDto.class);
        }

        @Override
        public void deletePost(Integer postId) {

                Post post = this.postRepo.findById(postId)
                                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));

                this.postRepo.delete(post);

        }

        @Override
        public PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy) {

                Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));

                Page<Post> pagePost = this.postRepo.findAll(p);
                List<Post> posts = pagePost.getContent();
                List<PostCreateDto> responsePosts = posts.stream()
                                .map((post) -> this.entityToPostCreateDto(post))
                                .toList();

                PostResponse postResponse = new PostResponse();
                postResponse.setContent(responsePosts);
                postResponse.setPageNumber(pagePost.getNumber());
                postResponse.setPageSize(pagePost.getSize());
                postResponse.setTotalElements(pagePost.getTotalElements());
                postResponse.setTotalPages(pagePost.getTotalPages());
                postResponse.setLastPage(pagePost.isLast());

                return postResponse;

                // List<Post> posts = this.postRepo.findAll();
        }

        @Override
        public PostDto getPostById(Integer postId) {
                Post post = this.postRepo.findById(postId)
                                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));

                return this.modelMapper.map(post, PostDto.class);
        }

        @Override
        public List<PostCreateDto> getPostsByCategory(Integer categoryId) {
                Category category = this.categoryRepo.findById(categoryId)
                                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

                List<Post> posts = this.postRepo.findByCategory(category);

                return posts.stream()
                                .map((post) -> this.entityToPostCreateDto(post))
                                .toList();
        }

        @Override
        public List<PostCreateDto> getPostsByUser(Integer userId) {
                User user = this.userRepo.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

                List<Post> posts = this.postRepo.findByUser(user);

                // return posts.stream()
                // .map((post) -> this.modelMapper.map(post, PostDto.class))
                // .toList();

                return posts.stream()
                                .map((post) -> this.entityToPostCreateDto(post))
                                .toList();
        }

        @Override
        public List<PostCreateDto> searchPosts(String keyword) {
                List<Post> posts = this.postRepo.findByPostTitleContaining(keyword);
                return posts.stream()
                                .map(post -> this.entityToPostCreateDto(post))
                                .toList();
        }

        @Override
        public List<PostCreateDto> getUserPostsByCategory(Integer userId, Integer categoryId) {

                List<PostCreateDto> userPosts = this.getPostsByUser(userId);
                List<PostCreateDto> categoryPosts = new ArrayList<>();

                for (PostCreateDto post : userPosts) {
                        if (post.getCategoryId().equals(categoryId)) {
                                categoryPosts.add(post);
                        }
                }

                return categoryPosts;
        }

        private PostCreateDto entityToPostCreateDto(Post post) {

                List<Comment> comments = post.getComments();
                List<CommentDto> commentDtos = comments.stream().map(comment -> this.entityToDto(comment)).toList();

                PostCreateDto pcdto = new PostCreateDto();
                pcdto.setPostId(post.getPostId());
                pcdto.setPostTitle(post.getPostTitle());
                pcdto.setPostContent(post.getPostContent());
                pcdto.setUserId(post.getUser().getId());
                pcdto.setCategoryId(post.getCategory().getCategoryId());
                pcdto.setComments(commentDtos);

                return pcdto;
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

}
