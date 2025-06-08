package blogging.blog.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blogging.blog.entities.Category;
import blogging.blog.exceptions.ResourceNotFoundException;
import blogging.blog.payloads.CategoryDto;
import blogging.blog.repositories.CategoryRepo;

@Service
public class CategoryServicesImpl implements CategoryServices {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {

        Category savedCategory = this.categoryRepo.save(dtoToEntity(categoryDto));

        return entityToDto(savedCategory);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId) {

        Category oldCategory = this.categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        oldCategory.setCategoryTitle(categoryDto.getCategoryTitle());
        oldCategory.setCategoryDescription(categoryDto.getCategoryDescription());

        Category newCategory = this.categoryRepo.save(oldCategory);

        return entityToDto(newCategory);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        Category deleteCategory = this.categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        this.categoryRepo.delete(deleteCategory);
    }

    @Override
    public CategoryDto getCategoryById(Integer categoryId) {
        Category foundCategory = this.categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        return entityToDto(foundCategory);
    }

    @Override
    public List<CategoryDto> getAllCategories() {

        List<Category> allCategories = this.categoryRepo.findAll();

        List<CategoryDto> allCategoryDtos = allCategories.stream().map(category -> entityToDto(category)).toList();

        return allCategoryDtos;
    }

    public Category dtoToEntity(CategoryDto categoryDto) {

        Category category = this.modelMapper.map(categoryDto, Category.class);

        return category;
    }

    public CategoryDto entityToDto(Category category) {

        CategoryDto categoryDto = this.modelMapper.map(category, CategoryDto.class);

        return categoryDto;
    }

}
