package com.NetQuest.springbootlibrary.DAO;




import com.NetQuest.springbootlibrary.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    Page<Event> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);
    Page<Event> findByCategory(@RequestParam("category") String category, Pageable pageable);


    @Query("select o from Event o where id in :event_ids")
    List<Event> findEventsByEventIds (@Param("event_ids") List<Long> eventId);

}