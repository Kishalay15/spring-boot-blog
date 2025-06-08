package blogging.blog.services;

import java.util.List;

import blogging.blog.payloads.CategoryDto;

public interface CategoryServices {

    CategoryDto createCategory(CategoryDto categoryDto);

    CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId);

    void deleteCategory(Integer categoryId);

    CategoryDto getCategoryById(Integer categoryId);

    List<CategoryDto> getAllCategories();
}
