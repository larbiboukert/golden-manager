import React from "react";

// reactstrap components
import {
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Container,
} from "reactstrap";

const Header = ({ brandText, data, setFilteredList }) => {
  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5">
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <p className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
              {brandText}
            </p>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Search"
                    type="text"
                    onChange={(e) =>
                      setFilteredList(
                        data.filter((item) =>
                          Object.values(item).some(
                            (v) =>
                              typeof v !== "number" &&
                              v.includes(e.target.value)
                          )
                        )
                      )
                    }
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
