import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Collapse,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

function Sidebar() {
  // used for checking current route
  const router = useRouter();
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => router.route === routeName;

  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const SideBarLink = ({ name, route }) => (
    <NavItem active={activeRoute(route)}>
      <Link href={route}>
        <NavLink
          className="uppercase"
          active={activeRoute(route)}
          onClick={closeCollapse}
        >
          <i className={"ni ni-bullet-list-67 text-red"} />
          {name}
        </NavLink>
      </Link>
    </NavItem>
  );

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigat To Dashboard */}
          <Nav navbar>
            <NavItem active={activeRoute("/")}>
              <Link href={"/"}>
                <NavLink active={activeRoute("/")} onClick={closeCollapse}>
                  <i className={"ni ni-tv-2 text-primary"} />
                  {"Dashboard"}
                </NavLink>
              </Link>
            </NavItem>
          </Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Navigation */}
          <Nav navbar>
            <SideBarLink name="articles" route="/articles" />
            <SideBarLink name="clients" route="/customers" />
            <SideBarLink name="fournisseurs" route="/suppliers" />
            <SideBarLink name="achats anonymes" route="/anonymous-purchases" />
            <SideBarLink name="charges" route="/expenses" />
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Sidebar;
