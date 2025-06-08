package blogging.blog.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import blogging.blog.entities.Role;

public interface RoleRepo extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(String name);

}
