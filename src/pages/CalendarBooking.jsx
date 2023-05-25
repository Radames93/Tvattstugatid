import React, { useState, useRef } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import Grid from "@mui/material/Unstable_Grid2";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import MyModal from "../components/SelectHoursModal";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const CalendarBooking = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const bookingCollectionRef = collection(db, "booking");

  const changeMessage = (newMessage) => {
    setData(newMessage);
    console.log(data);
  };

  const handleReset = () => {
    setData({ data: {} });
    console.log(data);
  };

  const handleDateSelect = (selectInfo) => {
    let title = data?.title;
    let id = data?.unique_id;
    console.log(data);
    let calendarApi = selectInfo.view.calendar;
    let start = selectInfo.startStr;
    let end = selectInfo.endStr;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id,
        title,
        start: start,
        end: end,
      });
    } else {
      console.log("not added");
    }
    setTimeout(function () {
      handleReset();
    }, 15000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (selectInfo) => {
    setOpen(true);
    setTimeout(function () {
      handleClose(), handleDateSelect(selectInfo);
    }, 7000);
  };

  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  async function handleEventAdd() {
    await addDoc(bookingCollectionRef, { data });
  }

  return (
    <Box m="20px">
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <Box p="15px" borderRadius="4px">
            <Typography variant="h5">Your Bookings</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid xs={12} md={8}>
          <Box mx="20px">
            <FullCalendar
              locale="sv"
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              handleWindowResize={true}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              select={handleOpen}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
              longPressDelay={1}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
                {
                  id: "12315",
                  title: "All-day event",
                  date: "2022-09-14",
                },
                {
                  id: "5123",
                  title: "Timed event",
                  date: "2022-09-28",
                },
              ]}
              eventAdd={(event) => handleEventAdd(event)}
            />
          </Box>
          {open && (
            <MyModal
              open
              handleOpen={handleOpen}
              handleClose={handleClose}
              changeMessage={changeMessage}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalendarBooking;
