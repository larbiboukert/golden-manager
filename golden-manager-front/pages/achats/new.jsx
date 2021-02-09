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
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import axios from "axios";
import { useRouter } from "next/router";
import { objectValuesToUpperCase } from "../../utils/functions";

const New = () => {
  const router = useRouter();

  const [state, setState] = useState({
    date: "",
    fournisseur: "",
    produits: [],
    versement: { or: 0.0, argent: 0.0 },
  });
  const [newProduct, setNewProduct] = useState({
    article: "",
    grammes: 0.0,
    prixUnitaire: 0.0,
  });
  useEffect(() => {
    setNewProduct({
      article: "",
      grammes: 0.0,
      prixUnitaire: 0.0,
    });
  }, [state.produits]);
  console.log(state);
  const [errorShown, setErrorShown] = useState(false);

  return (
    <>
      <Container className="mt-4" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="capitalize mb-0">{"Ajouter un achat"}</h3>
              </CardHeader>
              <Form>
                <FormGroup className="mx-4">
                  <label className=" form-control-label">Date</label>
                  <Input
                    value={state.date}
                    type="date"
                    onChange={(e) =>
                      setState({ ...state, date: e.target.value })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup className="mx-4">
                  <label className=" form-control-label">Fournisseur</label>
                  <Input
                    value={state.fournisseur}
                    type="text"
                    onChange={(e) =>
                      setState({ ...state, fournisseur: e.target.value })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup className="mx-4">
                  <label className=" form-control-label">Articles</label>
                  <ListGroup flush>
                    {state.produits.map((produit, index) => (
                      <ListGroupItem className="py-0">
                        <Row className="my-1 align-items-center">
                          <i
                            className="fas fa-minus nav-item"
                            onClick={() => {
                              setState({
                                ...state,
                                produits: state.produits.filter(
                                  (p, i) => i !== index
                                ),
                              });
                            }}
                          />
                          <div className="d-flex col">
                            <small>Article:</small>
                            <h5 className="mx-2 mb-0">{produit.article}</h5>
                          </div>
                          <div className="d-flex col">
                            <small>Grammes:</small>
                            <h5 className="mx-2 mb-0">{produit.grammes}</h5>
                          </div>
                          <div className="d-flex col">
                            <small>Prix unitaire:</small>
                            <h5 className="mx-2 mb-0">
                              {produit.prixUnitaire}
                            </h5>
                            <small>DA</small>
                          </div>
                        </Row>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                  <div className="d-flex">
                    <div className="d-flex flex-grow-1 align-items-center pr-4">
                      <label className="form-control-label pr-2">
                        Article:
                      </label>
                      <Input
                        value={newProduct.article}
                        type="text"
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            article: e.target.value,
                          })
                        }
                      ></Input>
                    </div>
                    <div className="d-flex flex-grow-1 align-items-center pr-4">
                      <label className="form-control-label pr-2">
                        Grammes:
                      </label>
                      <Input
                        value={newProduct.grammes}
                        type="text"
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            grammes: e.target.value,
                          })
                        }
                      ></Input>
                    </div>
                    <div className="d-flex flex-grow-1 align-items-center pr-4">
                      <label className="form-control-label pr-2">
                        Prix Unitaire (DA):
                      </label>
                      <Input
                        value={newProduct.prixUnitaire}
                        type="text"
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            prixUnitaire: e.target.value,
                          })
                        }
                      ></Input>
                    </div>
                    <Button
                      className="h-100 align-self-center"
                      onClick={() => {
                        setState({
                          ...state,
                          produits: [...state.produits, newProduct],
                        });
                      }}
                    >
                      <i className="fas fa-plus" />
                    </Button>
                  </div>
                </FormGroup>
                <FormGroup className="mx-4">
                  <label className=" form-control-label">Versement</label>
                  <div className="d-flex">
                    <div className="d-flex flex-grow-1 align-items-center pr-4">
                      <label className="form-control-label pr-2">Or:</label>
                      <Input
                        value={state.versement.or}
                        type="text"
                        onChange={(e) =>
                          setState({
                            ...state,
                            versement: {
                              ...state.versement,
                              or: e.target.value,
                            },
                          })
                        }
                      ></Input>
                    </div>
                    <div className="d-flex flex-grow-1 align-items-center pr-4">
                      <label className="form-control-label pr-2">
                        Argent (DA):
                      </label>
                      <Input
                        value={state.versement.argent}
                        type="text"
                        onChange={(e) =>
                          setState({
                            ...state,
                            versement: {
                              ...state.versement,
                              argent: e.target.value,
                            },
                          })
                        }
                      ></Input>
                    </div>
                  </div>
                </FormGroup>
                <FormGroup className="mx-4">
                  <Button
                    color="default"
                    type="button"
                    onClick={() => {
                      axios
                        .post("/api/Achats", objectValuesToUpperCase(state))
                        .then((res) => router.push("/achats"))
                        .catch((err) => setErrorShown(true));
                    }}
                  >
                    Ajouter
                  </Button>
                  {errorShown && (
                    <span className="error">Erreur, réessayer!</span>
                  )}
                </FormGroup>
              </Form>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default New;
