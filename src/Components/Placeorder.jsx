import React,{useContext, useState} from "react";
import Navbar from "./Navbar";
import { Box, Button, Card, Typography, TableContainer,Table, TableBody, TableRow, TableCell,Modal } from "@mui/material";
import { useNavigate } from "react-router";
import data from './data.js';
import { UserContext } from "../App.jsx";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius:"5px",
  boxShadow: 24,
  p: 2,
};


function Placeorder() {
  const {totalCount, count, clear}  = useContext(UserContext);
  const navigate = useNavigate();
  const filtered = data.filter(d=>count[d.id] >0);
  const totalPrice = filtered.reduce((tot, n) => tot + n.price * count[n.id],0)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleReset = () => {
    navigate('/dashboard')
    clear();
  }

  return (
    <>
      <Navbar />
      <Box sx={{ padding: "130px 30px 0px" }}>
        <Button
          variant="outlined"
          size="large"
          color="black"
          sx={{
            border: "1px solid grey",
            display: "block",
            margin: "0 0 15px 0",
          }}
          onClick={() => navigate(-1)}
        >
          BACK TO CART
        </Button>
        <Card
          sx={{
            width: "780px",
            padding: "15px 20px 0",
            backgroundColor: "#00990021",
          }}
        >
          <Typography variant="h5">Order Summary</Typography>
          <Typography variant="subtitle1">
            You have {totalCount} Items in Your Shopping Cart
          </Typography>

          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {filtered.map(d => (
                  <TableRow sx={{ '& td, & th': { borderBottom: "1px solid black" } }} key={d.id}>
                  <TableCell sx={{fontWeight: "bold", fontSize:"1.1rem"}}>{count[d.id]} * {d.name}</TableCell>
                  <TableCell align="right" sx={{fontWeight: "bold", fontSize:"1.1rem"}}>${d.price * count[d.id]}</TableCell>
                </TableRow>
                ))}
                
                <TableRow sx={{ '& td, & th': { borderBottom: "1px solid black" } }}>
                  <TableCell sx={{fontWeight: "bold", fontSize:"1.1rem"}}>Total Price</TableCell>
                  <TableCell align="right" sx={{fontWeight: "bold", fontSize:"1.1rem"}}>${totalPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#0D47A1", margin: "20px 0" }}
          onClick={handleOpen}
        >
          PLACE ORDER
        </Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Thank You For Placing the Order
          </Typography>
          <Box sx={{display:"flex", justifyContent: "right", alignItems:"flex-end",mt:2}}>
             <Button onClick={handleReset} sx={{color: "#0D47A1"}}>OKAY</Button>
           </Box>
        </Box>
      </Modal>
      </Box>
    </>
  );
}

export default Placeorder;
