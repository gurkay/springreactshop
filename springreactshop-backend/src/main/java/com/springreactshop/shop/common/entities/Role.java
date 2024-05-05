package com.springreactshop.shop.common.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "roles")
public class Role {

    public Role(Long id) {
        this.id = id;
    }  

    public Role(String name, String desc){
        this.name = name;
        this.Description = desc;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Exclude
    private Long id;

    @Column(name = "name", length = 40, nullable = false, unique = true)
    private String name;

    @Column(name = "description", length = 150, nullable = false)
    private String Description;

    @Override
    public String toString() {
        return "Role [id=" + id + ", name=" + name + ", Description=" + Description + "]";
    }
}
