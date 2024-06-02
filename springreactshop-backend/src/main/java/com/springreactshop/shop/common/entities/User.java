package com.springreactshop.shop.common.entities;

import java.util.Set;
import java.util.HashSet;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.JoinColumn;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Exclude
    private Long id;

    @Column(name = "email", length = 128, nullable = false, unique = true)
    private String email;

    @Column(name = "password", length = 128, nullable = false)
    private String password;

    @Column(name = "first_name", length = 64, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 64, nullable = false)
    private String lastName;

    @Column(name = "photos", length = 128)
    private String photos;

    @Column(name = "enabled", length = 1, nullable = false)
    private boolean enabled;

    @ManyToMany
    @JoinTable(
        name = "users_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User addRole(Role role) {
        this.roles.add(role);
        return this;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", email=" + email + ", firstName=" + firstName + ", lastName=" + lastName
                + ", enabled=" + enabled + ", roles=" + roles + "]";
    }

    @Transient
    public String getPhotosImagePath() {
        if(this.id == null || this.photos == null) {
            return "/images/default-user.png";
        }
        return "/images/user-photos/" + this.id + "/" + this.photos;
    }
}
