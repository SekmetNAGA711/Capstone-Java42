package com.NetQuest.springbootlibrary.controller;


import com.NetQuest.springbootlibrary.Utils.ExtractJWT;
import com.NetQuest.springbootlibrary.entity.Event;
import com.NetQuest.springbootlibrary.responsemodels.ShelfCurrentUpcomingsResponse;
import com.NetQuest.springbootlibrary.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/events")

public class EventController {

    private EventService eventService;


    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }



    @GetMapping("/secure/currentupcomings")
    public List<ShelfCurrentUpcomingsResponse> currentUpcomings(@RequestHeader(value = "Authorization") String token)
            throws Exception
    {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return eventService.currentUpcomings(userEmail);
    }


    @GetMapping("/secure/currentcount/count")
    public int currentCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return eventService.currentCount(userEmail);
    }

    @GetMapping("/secure/reservedticket/byuser")
    public Boolean ticketEventByUser(@RequestHeader (value = "Authorization") String token,
                                     @RequestParam Long eventId) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return eventService.ticketEventByUser(userEmail, eventId);
    }


    @PutMapping("/secure/ticket")
    public Event ticketEvent (@RequestHeader(value = "Authorization") String token,
                              @RequestParam Long eventId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return eventService.ticketEvent(userEmail, eventId);
    }


    @PutMapping("/secure/return")
    public void returnEvent(@RequestHeader(value = "Authorization") String token,
                            @RequestParam Long eventId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        eventService.returnEvent(userEmail, eventId);
    }



    @PutMapping("/secure/renew/upcoming")
    public void renewUpcoming(@RequestHeader(value = "Authorization") String token,
                              @RequestParam Long eventId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        eventService.renewUpcoming(userEmail, eventId);
    }



}

