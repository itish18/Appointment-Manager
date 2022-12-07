import React from "react";
import { Navigate } from "react-router-dom";

/** MUI */
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";

/**Custom components */
import { Calendar } from "../components/Calendar";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

const Calender = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Container sx={{ mt: 8 }}>
        <Box>
          <Calendar />
        </Box>
      </Container>
    </>
  );
};

export default Calender;
