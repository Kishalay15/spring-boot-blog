package blogging.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import blogging.blog.entities.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer> {

}
