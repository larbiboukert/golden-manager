import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardTitle,
  CardText,
  Col,
  CardBody,
  Table,
} from "reactstrap";
import Header from "../../../../components/Header/Header";
import useSWR from "swr";
import { fetcher } from "../../../../utils/api";
import { useRouter } from "next/router";
import axios from "axios";
import { objectValuesToUpperCase } from "../../../../utils/functions";

const Index = () => {
  const router = useRouter();
  const { stakeholderType, stakeholderId } = router.query;
  const { data, error, mutate } = useSWR(
    `/api/Stakeholders/${stakeholderId}`,
    fetcher
  );
  const [isEdit, setIsEdit] = useState(false);
  const [errorShown, setErrorShown] = useState(false);
  const [activeTab, setActiveTab] = useState("operations");

  const [state, setState] = useState();
  useEffect(() => {
    if (data) setState(data);
  }, [data]);
  console.log(data);
  return (
    <>
      <Header brandText={stakeholderType} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="capitalize mb-0">{`Modifier le ${stakeholderType}`}</h3>
              </CardHeader>
              {error ? (
                "Echec, essayer de rafrechir la page.."
              ) : !state ? (
                "Loading.."
              ) : (
                <CardBody>
                  <FormGroup className="">
                    <Label className="pr-4">Reference:</Label>
                    <Label>{state.reference}</Label>
                  </FormGroup>
                  <FormGroup className="">
                    <Label className="pr-4">Totale achats:</Label>
                    <Label>{"124391875.33"} DA</Label>
                  </FormGroup>
                  <FormGroup className="">
                    <Label className="pr-4">Totale des versement:</Label>
                    <Label>
                      Or: {"10000.99"} Grammes | Argent: {"494632.76"} DA
                    </Label>
                  </FormGroup>
                  <Form>
                    <Row className="mx-1 justify-content-between align-items-end">
                      <FormGroup>
                        <label className=" form-control-label">Nom</label>
                        <Input
                          value={state.name}
                          type="text"
                          onChange={(e) =>
                            setState({ ...state, name: e.target.value })
                          }
                          disabled={!isEdit}
                        ></Input>
                      </FormGroup>
                      <FormGroup>
                        <label className=" form-control-label">Telephone</label>
                        <Input
                          value={state.phoneNumber}
                          type="tel"
                          onChange={(e) =>
                            setState({ ...state, phoneNumber: e.target.value })
                          }
                          disabled={!isEdit}
                        ></Input>
                      </FormGroup>
                      <FormGroup>
                        <label className=" form-control-label">Ville</label>
                        <Input
                          value={state.city}
                          type="text"
                          onChange={(e) =>
                            setState({ ...state, city: e.target.value })
                          }
                          disabled={!isEdit}
                        ></Input>
                      </FormGroup>
                      <FormGroup>
                        <label className=" form-control-label">Willaya</label>
                        <Input
                          value={state.state}
                          type="text"
                          onChange={(e) =>
                            setState({ ...state, state: e.target.value })
                          }
                          disabled={!isEdit}
                        ></Input>
                      </FormGroup>
                      <FormGroup>
                        <Button
                          color="default"
                          type="button"
                          onClick={() => {
                            if (!isEdit) setIsEdit(true);
                            else
                              axios
                                .put(
                                  `/api/Stakeholders/${stakeholderId}`,
                                  objectValuesToUpperCase(state)
                                )
                                .then((res) => {
                                  setIsEdit(false);
                                  mutate();
                                })
                                .catch((err) => setErrorShown(true));
                          }}
                        >
                          {isEdit ? "Enregister" : "Modifier"}
                        </Button>
                      </FormGroup>
                    </Row>
                    {errorShown && (
                      <span className=" error">Erreur, réessayer!</span>
                    )}
                  </Form>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <div className="d-flex">
                  <Nav tabs className="flex-grow-1">
                    <NavItem>
                      <NavLink
                        className={activeTab === "operations" ? "active" : ""}
                        onClick={() => setActiveTab("operations")}
                      >
                        {stakeholderType === "fournisseurs" && "Achats"}
                        {stakeholderType === "client" && "Ventes"}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "payments" ? "active" : ""}
                        onClick={() => setActiveTab("payments")}
                      >
                        Versements
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div>
                    <Button
                      onClick={() =>
                        router.push(`/stakeholders/${stakeholderType}/${stakeholderId}/operations/new`)
                      }
                    >
                      Nouvel
                      {stakeholderType === "fournisseurs" && " Achat"}
                      {stakeholderType === "client" && " Vente"}
                      <i className="fas fa-plus ml-3" />
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(`/stakeholders/${stakeholderType}/${stakeholderId}/payments/new`)
                      }
                    >
                      Nouvel versement
                      <i className="fas fa-plus ml-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="operations">
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Reference</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!state ? (
                          <tr>
                            <td>loading...</td>
                          </tr>
                        ) : state.operations.length === 0 ? (
                          <tr>
                            <td>Vide</td>
                          </tr>
                        ) : (
                          state.operations.map((row) => (
                            <tr key={row.id}>
                              <th
                                className="nav-item"
                                scope="row"
                                onClick={(e) =>
                                  router.push(
                                    `/stakeholders/${stakeholderType}/${stakeholderId}/operations/${row.id}`
                                  )
                                }
                              >
                                <span className="mb-0 text-sm">
                                  {row.reference}
                                </span>
                              </th>
                              <td>{row.date}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </TabPane>
                  <TabPane tabId="payments">
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Reference</th>
                          <th scope="col">Date</th>
                          <th scope="col">Argent versé</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!state ? (
                          <tr>
                            <td>loading...</td>
                          </tr>
                        ) : state.payments.length === 0 ? (
                          <tr>
                            <td>Vide</td>
                          </tr>
                        ) : (
                          state.payments.map((row) => (
                            <tr key={row.id}>
                              <th
                                className="nav-item"
                                scope="row"
                                onClick={(e) =>
                                  `/stakeholders/${stakeholderType}/${stakeholderId}/payments/${row.id}`
                                }
                              >
                                <span className="mb-0 text-sm">
                                  {row.reference}
                                </span>
                              </th>
                              <td>{row.date}</td>
                              <td>{row.money}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
