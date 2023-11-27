package com.NetQuest.springbootlibrary.responsemodels;


import com.NetQuest.springbootlibrary.entity.Event;
import lombok.Data;

@Data
public class ShelfCurrentUpcomingsResponse {
    public ShelfCurrentUpcomingsResponse(Event event, int daysLeft) {
        this.event = event;
        this.daysLeft = daysLeft;
    }

    private Event event;

    private int daysLeft;


}
