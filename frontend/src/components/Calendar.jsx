import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import listPlugin from "@fullcalendar/list"; // a plugin!
import { useDispatch, useSelector } from "react-redux";
import { setAppointment } from "../features/appointment/appointmentSlice";

/** Custom components */
import AddAppointmentModal from "./AddAppointmentModal";
import AppointmentModal from "./AppointmentModal";
import Spinner from "./Spinner";

import { useEffect } from "react";
import { fetchAppointments } from "../features/appointment/appointmentSlice";

export const Calendar = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openDetailModal, setOpenDetailModal] = React.useState(false);
  const dispatch = useDispatch();

  const { appointments, isLoading } = useSelector((state) => state.appointment);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleDateClick = (info) => {
    const selectedAppointment = appointments.find(
      (a) => a._id === info.event.id
    );
    dispatch(setAppointment(selectedAppointment));
    setOpenDetailModal(true);
  };

  if (isLoading) {
    return <Spinner />;
  }

  // if (!appointments) {
  //   return <p>No appointments found.</p>;
  // }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        eventClick={handleDateClick}
        headerToolbar={{
          start: "today prev next",
          center: "title",
          end: "addAppointmentBtn dayGridMonth,listMonth",
        }}
        dayMaxEvents={true}
        customButtons={{
          addAppointmentBtn: {
            text: "New",
            click: () => setOpenAddModal(true),
          },
        }}
        events={appointments.map((a) => ({ ...a, id: a._id }))}
      />

      {/** appointments.map transformation needed, _id is not recognized by FullCalendar */}

      <AddAppointmentModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleOpen={() => setOpenAddModal(true)}
      />
      <AppointmentModal
        open={openDetailModal}
        handleClose={() => setOpenDetailModal(false)}
        handleOpen={() => setOpenDetailModal(true)}
      />
    </>
  );
};
