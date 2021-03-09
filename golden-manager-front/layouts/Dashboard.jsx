import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Col, Container, Row } from "reactstrap";

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
      <Sidebar />
      <div className="main-content" ref={mainContentRef}>
        <Container className="my-4">
          <Row>
            <Col>{props.children}</Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
