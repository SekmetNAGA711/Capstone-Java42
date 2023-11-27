package com.NetQuest.springbootlibrary.entity;



import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "ticket")

@Data
public class Ticket {

    public Ticket() {}

    public Ticket(String userEmail, String ticketDate, String expirationDate, Long eventId) {
        this.userEmail = userEmail;
        this.ticketDate = ticketDate;
        this.expirationDate = expirationDate;
        this.eventId = eventId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "ticket_date")
    private String ticketDate;

    @Column(name = "expiration_date")
    private String expirationDate;

    @Column(name = "event_id")
    private Long eventId;
}