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
import { collection, addDoc, getDocs } from "firebase/firestore";
import QrCode from "../components/QrCode";

const CalendarBooking = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [bookings, setBooking] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const bookingCollectionRef = collection(db, "booking");

  const changeMessage = (newMessage) => {
    setData(newMessage);
    console.log(newMessage);
    console.log(data);
  };

  const handleOpen = (selectInfo) => {
    setOpen(true);
    setTimeout(function () {
      handleClose(), handleDateSelect(selectInfo);
    }, 10000);
  };

  const handleDateSelect = async (selectInfo) => {
    let title = data?.title;
    let id = data?.unique_id;
    let calendarApi = selectInfo.view.calendar;
    setStart(selectInfo.startStr);
    setEnd(selectInfo.endStr);
    if (title) {
      calendarApi.addEvent({
        id,
        title,
        start,
        end,
      });
      setData({ start: start, end: end });
    } else {
      console.log("not added");
    }
    console.log(data);
  };

  const handleClose = () => {
    setOpen(false);
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

  async function handleDateSet() {
    const querySnapshot = await getDocs(bookingCollectionRef);
    const data = querySnapshot.docs.map((doc) => doc.data());
    data.map((booking) => {
      console.log(booking.data);
      setBooking(booking.data);
      console.log(bookings);
    });
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
                  <QrCode />
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
              eventAdd={() => handleEventAdd()}
              datesSet={() => handleDateSet()}
            />
          </Box>
          {open && (
            <MyModal
              open
              handleOpen={handleOpen}
              handleClose={handleClose}
              changeMessage={changeMessage}
              start={start}
              end={end}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalendarBooking;
