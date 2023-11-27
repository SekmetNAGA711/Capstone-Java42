package com.NetQuest.springbootlibrary.service;



import com.NetQuest.springbootlibrary.DAO.EventRepository;
import com.NetQuest.springbootlibrary.DAO.TicketRepository;
import com.NetQuest.springbootlibrary.entity.Event;
import com.NetQuest.springbootlibrary.entity.Ticket;
import com.NetQuest.springbootlibrary.responsemodels.ShelfCurrentUpcomingsResponse;
import org.springframework.stereotype.Service;


import java.text.SimpleDateFormat;
import java.time.LocalDate;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;


import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional
public class EventService {

    private EventRepository eventRepository;

    private TicketRepository ticketRepository;

    public EventService(EventRepository eventRepository, TicketRepository ticketRepository) {
        this.eventRepository = eventRepository;
        this.ticketRepository = ticketRepository;

    }

    public Event ticketEvent(String userEmail, Long eventId) throws Exception {

        Optional<Event> event = eventRepository.findById(eventId);

        Ticket validateTicket = ticketRepository.findByUserEmailAndEventId(userEmail, eventId);

        if (!event.isPresent() || validateTicket != null || event.get().getEventAvailable() <= 0) {
            throw new Exception("Event doesn't exist or already reserved");
        }

        event.get().setEventAvailable(event.get().getEventAvailable() - 1);
        eventRepository.save(event.get());

        Ticket ticket = new Ticket(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                event.get().getId()
        );

        ticketRepository.save(ticket);

        return event.get();

    }

    public Boolean ticketEventByUser(String userEmail, Long eventId) {
        Ticket validateTicket = ticketRepository.findByUserEmailAndEventId(userEmail, eventId);
        if (validateTicket != null) {
            return true;
        } else {
            return false;
        }
    }


    public int currentCount(String userEmail) {

        return ticketRepository.findEventsByUserEmail(userEmail).size();
    }


    public List<ShelfCurrentUpcomingsResponse> currentUpcomings(String userEmail) throws Exception {

        List<ShelfCurrentUpcomingsResponse> shelfCurrentUpcomingsResponse = new ArrayList<>();

        List<Ticket> ticketList = ticketRepository.findEventsByUserEmail(userEmail);
        List<Long> eventIdList = new ArrayList<>();

        for (Ticket i : ticketList) {
            eventIdList.add(i.getEventId());
        }

        List<Event> events = eventRepository.findEventsByEventIds(eventIdList);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for (Event event : events) {
            Optional<Ticket> ticket = ticketList.stream()
                    .filter(x -> x.getEventId() == event.getId()).findFirst();

            if (ticket.isPresent()) {

                Date d1 = sdf.parse(ticket.get().getExpirationDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit time = TimeUnit.DAYS;

                long difference_In_Time = time.convert(d1.getTime() - d2.getTime(),
                        TimeUnit.MILLISECONDS);

                shelfCurrentUpcomingsResponse.add(new ShelfCurrentUpcomingsResponse(event, (int) difference_In_Time));
            }
        }
        return shelfCurrentUpcomingsResponse;
    }
    public void returnEvent (String userEmail, Long eventId) throws Exception {

        Optional<Event> event = eventRepository.findById(eventId);

        Ticket validateTicket = ticketRepository.findByUserEmailAndEventId(userEmail, eventId);

        if (!event.isPresent() || validateTicket == null) {
            throw new Exception("Event does not exist or not booked by user");
        }

        event.get().setEventAvailable(event.get().getEventAvailable() + 1);

        eventRepository.save(event.get());
        ticketRepository.deleteById(validateTicket.getId());

    }

    public void renewUpcoming(String userEmail, Long eventId) throws Exception {

        Ticket validateTicket = ticketRepository.findByUserEmailAndEventId(userEmail, eventId);

        if (validateTicket == null) {
            throw new Exception("Event does not exist or not booked by user");
        }

        SimpleDateFormat sdFormat = new SimpleDateFormat("yyyy-MM-dd");

        Date d1 = sdFormat.parse(validateTicket.getExpirationDate());
        Date d2 = sdFormat.parse(LocalDate.now().toString());

        if (d1.compareTo(d2) > 0 || d1.compareTo(d2) == 0) {
            validateTicket.setExpirationDate(LocalDate.now().plusDays(7).toString());
            ticketRepository.save(validateTicket);
        }
    }
//
//    public EventDTO getEventById(Long id) {
//        Optional<Event> event = eventRepository.findById(id);
//        if (event.isPresent()) {
//            return EventDTO.DTOConverter.convertToEventDTO(event.get());
//        }
//        return null; // or throw an exception
    }


