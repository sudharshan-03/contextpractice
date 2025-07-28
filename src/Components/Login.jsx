import { Box, styled, Typography, TextField, Button,Snackbar,Alert } from "@mui/material";
import "../styles/login.css";
import { useNavigate } from "react-router";
import { useState } from "react";

const CustomLegend = styled(Typography)({
  color: "white",
  backgroundColor: "grey",
  padding: "1px 20px",
  fontWeight: "bolder",
  position: "absolute",
  top: "-3%",
  left: "4%",
  fontSize: "1rem",
  letterSpacing: ".5px",
});

const CustomTextField = styled(TextField)({
  "& input": {
    paddingLeft: 4,
    height: "15px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: 2,
      borderColor: "black grey grey black",
      borderRadius: "5px",
    },
    "&:hover fieldset": {
      borderWidth: 2,
      borderColor: "black grey grey black",
    },
    "&.Mui-focused fieldset": {
      borderWidth: 2,
      borderColor: "black grey grey black",
    },
  },
});

function Login() {
  let [name, setName] = useState("");
  let [mail, setMail] = useState("");
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [nameHelp, setNameHelp] = useState("");
  const [mailHelp, setMailHelp] = useState("");

  const handleSubmit = () => {
    let namepattern = /^[a-zA-Z]{2,}$/;
    let mailpattern = /^[\w\d]+@[\w\d]+\.[\w\d]+$/;
    if (!namepattern.test(name)) {
      setNameHelp("Enter Correct Name")
      return;
    } else if(!mailpattern.test(mail)) {
      setNameHelp("")
      setMailHelp("Enter Correct Mail-ID")
      return;
      
    } else {
      setMailHelp("")
      navigate("/dashboard");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "url(./src/assets/two.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100vw 110vh",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "590px",
            height: "398px",
            backgroundColor: "white",
            border: "3px solid grey",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <CustomLegend>ECOMMERCE LOGIN</CustomLegend>
          <CustomTextField
            sx={{ width: "300px" }}
            placeholder="UserName"
            value={name}
            onChange={(e) =>
              setName(e.target.value.replace(/[\d~!@#$%^&*_+-=;'":]/g, ""))
            }
            error={nameHelp}
            helperText = {nameHelp}
          ></CustomTextField>
          <CustomTextField
            sx={{ width: "300px" }}
            placeholder="Email ID"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            error={mailHelp}
            helperText = {mailHelp}
          ></CustomTextField>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0D47A1" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="info"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Welcome to ECommerce Page
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
}

export default Login;
