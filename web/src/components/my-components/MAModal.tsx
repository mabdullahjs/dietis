import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
// import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from "@mui/icons-material/Close";

interface prop {
  open: any;
  close?: any;
  modalTitle?: string;
  innerContent: any;
  width?: string;
  modalFooter?: any;
}
export default function MAModal(props: prop) {
  const { open, close, modalTitle, innerContent, width, modalFooter } = props;

  const handleClose = () => {
    close(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width ?? "50%",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: width ?? "60vw" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: '1px solid #dee2e6', alignItems: "center" }} >
            <Typography variant="h5" id="parent-modal-title">
              {modalTitle}
            </Typography>
            <CloseIcon onClick={handleClose} />
          </Box>
          <Box className="modalBody" sx={{
            paddingTop: '1rem',
            paddingBottom: '1rem',
          }}>{innerContent}</Box>
          {modalFooter && <Box sx={{ paddingBottom: "0.5rem" }}>{modalFooter}</Box>}
        </Box>
      </Modal>
    </div >
  );
}
