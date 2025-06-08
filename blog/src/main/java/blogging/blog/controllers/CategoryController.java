package blogging.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import blogging.blog.payloads.CategoryDto;
import blogging.blog.services.CategoryServices;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryServices categoryServices;

    @PostMapping("/")
    public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto) {

        CategoryDto createdCategory = this.categoryServices.createCategory(categoryDto);

        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Integer categoryId) {

        CategoryDto categoryDto = this.categoryServices.getCategoryById(categoryId);

        return new ResponseEntity<>(categoryDto, HttpStatus.OK);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto categoryDto,
            @PathVariable Integer categoryId) {

        CategoryDto updatedCategoryDto = this.categoryServices.updateCategory(categoryDto, categoryId);

        return new ResponseEntity<>(updatedCategoryDto, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {

        List<CategoryDto> categoryDtos = this.categoryServices.getAllCategories();

        return new ResponseEntity<>(categoryDtos, HttpStatus.OK);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer categoryId) {

        CategoryDto categoryDto = this.categoryServices.getCategoryById(categoryId);
        this.categoryServices.deleteCategory(categoryId);

        return new ResponseEntity<>(categoryDto, HttpStatus.OK);
    }

}
