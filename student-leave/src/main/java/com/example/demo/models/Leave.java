package com.example.demo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "leaves")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Leave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pinNumber;
    private Date startDate;
    private Date endDate;
    private String reason;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "pinNumber", nullable = false)  // Reference pinNumber
    @JsonIgnore
    private User user;
    public String getPinNumber() {
        return user != null ? user.getPinNumber() : null;
    }
}
