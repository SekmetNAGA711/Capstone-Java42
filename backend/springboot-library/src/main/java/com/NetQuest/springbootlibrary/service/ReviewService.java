package com.NetQuest.springbootlibrary.service;


import com.NetQuest.springbootlibrary.DAO.ReviewRepository;
import com.NetQuest.springbootlibrary.entity.Review;
import com.NetQuest.springbootlibrary.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {


    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService( ReviewRepository reviewRepository) {


        this.reviewRepository = reviewRepository;
    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndEventId(userEmail, reviewRequest.getEventId());
        if (validateReview != null) {
            throw new Exception("Review already created");
        }

        Review review = new Review();
        review.setEventId(reviewRequest.getEventId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);
        if (reviewRequest.getReviewDescription().isPresent()) {
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }


    public Boolean userReviewListed(String userEmail, Long eventId) {
        Review validateReview = reviewRepository.findByUserEmailAndEventId(userEmail, eventId);
        if (validateReview != null) {
            return true;
        } else {
            return false;
        }
    }


}