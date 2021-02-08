import React from "react";
// reactstrap components
import { Container } from "reactstrap";
// core components
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

function Dashboard(props) {
  // used for checking current route
  let mainContentRef = React.createRef();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, []);
  return (
    <>
      <Sidebar
        {...props}
        logo={{
          innerLink: "/articles",
          imgSrc: require("assets/img/brand/logo.svg"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        {props.children}
        <Container fluid>
          <Footer />
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
