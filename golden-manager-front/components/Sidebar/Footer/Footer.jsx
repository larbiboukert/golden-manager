/*eslint-disable*/
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="copyright text-center text-muted">
        © {new Date().getFullYear()}
        <a
          className="font-weight-bold ml-1"
          href="https://www.instagram.com/larbiboukert/"
          rel="noopener noreferrer"
          target="_blank"
        >
          @larbiboukert
        </a>
      </div>
    </footer>
  );
};

export default Footer;
