import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Capture from "../assets/images/Capture.png";
import { Fade } from "@mui/material";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const style = {
  height: "91.5vh",
  margin: "0px",
  padding: "0px",
  background: "#4D77FF",
  opacity: "0.6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Home = () => {
  const [show, setShow] = useState(true);
  const [heading, setHeading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    setInterval(function () {
      setShow(false);
    }, 2000);
  }, []);

  setTimeout(() => {
    setHeading(true);
  }, 2500);

  const onStart = () => {
    if (user) {
      navigate("/calender");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${Capture})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <Box sx={style}>
        <Box sx={{ textAlign: "center" }}>
          <Slide direction="left" in={show} mountOnEnter unmountOnExit>
            <h1
              style={{
                color: "white",
                fontSize: "5rem",
                fontWeight: "250",
              }}
            >
              Now manage appointments easily
            </h1>
          </Slide>
          <Slide direction="right" in={show} mountOnEnter unmountOnExit>
            <h1
              style={{
                color: "white",
                fontSize: "5rem",
                fontWeight: "250",
              }}
            >
              With
            </h1>
          </Slide>
          <Slide direction="down" in={show} mountOnEnter unmountOnExit>
            <h1
              style={{
                color: "white",
                fontSize: "5rem",
                fontWeight: "250",
              }}
            >
              Appointment Manager
            </h1>
          </Slide>

          {heading && (
            <Box>
              <Grow in={heading} style={{ transformOrigin: "0 0 0" }}>
                <h1
                  style={{
                    color: "white",
                    fontSize: "5.9rem",
                    fontWeight: "450",
                    marginBottom: "3rem",
                  }}
                >
                  Appointment Manager
                </h1>
              </Grow>
              <Fade
                in={heading}
                style={{
                  margin: "0px",
                  transitionDelay: heading ? "1000ms" : "0ms",
                }}
                onClick={onStart}
              >
                <Button
                  variant="contained"
                  size="large"
                  style={{ fontSize: "1.4rem", border: "2px solid" }}
                  onClick={onStart}
                >
                  Let's Create
                </Button>
              </Fade>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
