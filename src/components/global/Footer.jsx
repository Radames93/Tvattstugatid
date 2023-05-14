import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Typography
      data-testid="footer"
      sx={{
        position: "sticky",
        top: "100%",
        textAlign: "center",
        p: "10px",
      }}
    >
      <strong fontFamily="Source Sans Pro" fontWeight="700" fontSize="16px">
        Copyright © 2022-2023
        <a href="https://f-r.se/" style={{ marginLeft: 5 }}>
          Fastighetsservice Ab
        </a>
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
