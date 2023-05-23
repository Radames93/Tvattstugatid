import * as React from "react";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Typography
      data-testid="footer"
      sx={{
        backgroundColor: "#000000",
        position: "sticky",
        top: "100%",
        textAlign: "center",
        p: "10px",
        color: "white",
      }}
    >
      <strong fontFamily="Source Sans Pro" fontWeight="700" fontSize="16px">
        Copyright © 2022-2023 <a href="https://f-r.se/">FastighetService</a>
      </strong>
      <span
        fontFamily="Source Sans Pro"
        fontWeight="400"
        fontSize="16px"
        style={{ marginLeft: 5 }}
      >
        All rights reserved
      </span>
    </Typography>
  );
};

export default Footer;
