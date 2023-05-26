import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Button, Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

const QrCode = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        type="submit"
        color="secondary"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Show QR code
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: "center",
              p: "10px",
            }}
          >
            Scan this code to go in the washing room
          </Typography>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={"booking"}
            viewBox={`0 0 256 256`}
          />
        </Box>
      </Modal>
    </>
  );
};

export default QrCode;
