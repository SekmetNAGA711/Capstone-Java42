package com.NetQuest.springbootlibrary.DAO;


import com.NetQuest.springbootlibrary.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Ticket findByUserEmailAndEventId(String userEmail, Long eventId);

    List<Ticket> findEventsByUserEmail(String userEmail);

    @Modifying
    @Query("delete from Ticket where event_id in :event_id")
    void deleteAllByEventId(@Param("event_id") Long eventId);
}

