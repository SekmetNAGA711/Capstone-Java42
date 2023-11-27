package com.NetQuest.springbootlibrary.DAO;


import com.NetQuest.springbootlibrary.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByEventId(@RequestParam("event_id") Long eventId,
                               Pageable pageable);

    Review findByUserEmailAndEventId(String userEmail, Long eventId);


}
