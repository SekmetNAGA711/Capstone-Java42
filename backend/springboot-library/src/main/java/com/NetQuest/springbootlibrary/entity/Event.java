package com.NetQuest.springbootlibrary.entity;


import lombok.Data;
import javax.persistence.*;


@Entity
@Table(name = "event")
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    @Column(name="id")
    private Long id;


    @Column(name = "title")
    private String title;

    @Column(name = "sponsor")
    private String sponsor;

    @Column(name = "description")
    private String description;

    @Column(name="quantity")
    private int quantity;

    @Column(name="event_available")
    private int eventAvailable;

    @Column(name="category")
    private String category;

    @Column(name="img")
    private String img;

}