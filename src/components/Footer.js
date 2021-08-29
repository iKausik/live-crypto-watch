import React from "react";
import { Twitter, LinkedIn, Instagram, GitHub } from "@material-ui/icons";

const Footer = () => {
  return (
    <>
      <div className="footer-text">
        <a href="https://github.com/ikausik" target="_blank" rel="noreferrer">
          <GitHub />
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://twitter.com/kausik47" target="_blank" rel="noreferrer">
          <Twitter />
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a
          href="https://linkedin.com/in/ikausik"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedIn />
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a
          href="https://instagram.com/ikausik"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram />
        </a>
        <br />
        <br /> © {new Date().getFullYear()} Built by{" "}
        <a href="https://kausikdas.com" target="_blank" rel="noreferrer">
          &nbsp;<span id="me">KAUSIK DAS</span>
        </a>
      </div>
    </>
  );
};

export default Footer;
