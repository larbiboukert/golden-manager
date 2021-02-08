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
} from "reactstrap";
import Header from "../../components/Header/Header";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import { useRouter } from "next/router";
import axios from "axios";
import { objectValuesToUpperCase } from "../../utils/functions";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/Clients/${id}`, fetcher);
  const [state, setState] = useState();
  useEffect(() => {
    if (data) setState(data);
  }, [data]);

  const [errorShown, setErrorShown] = useState(false);

  return (
    <>
      <Header brandText={"Client"} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="capitalize mb-0">{"Modifier le client"}</h3>
              </CardHeader>
              {error ? (
                "Echec, essayer de rafrechir la page.."
              ) : !state ? (
                "Loading.."
              ) : (
                <Form>
                  <FormGroup className="mx-4">
                    <label className=" form-control-label">Reference</label>
                    <Input
                      value={state.reference}
                      type="text"
                      onChange={(e) =>
                        setState({ ...state, reference: e.target.value })
                      }
                    ></Input>
                  </FormGroup>
                  <FormGroup className="mx-4">
                    <label className=" form-control-label">Nom</label>
                    <Input
                      value={state.nom}
                      type="text"
                      onChange={(e) =>
                        setState({ ...state, nom: e.target.value })
                      }
                    ></Input>
                  </FormGroup>
                  <FormGroup className="mx-4">
                    <label className=" form-control-label">Telephone</label>
                    <Input
                      value={state.telephone}
                      type="tel"
                      onChange={(e) =>
                        setState({ ...state, telephone: e.target.value })
                      }
                    ></Input>
                  </FormGroup>
                  <FormGroup className="mx-4">
                    <label className=" form-control-label">Ville</label>
                    <Input
                      value={state.ville}
                      type="text"
                      onChange={(e) =>
                        setState({ ...state, ville: e.target.value })
                      }
                    ></Input>
                  </FormGroup>
                  <FormGroup className="mx-4">
                    <label className=" form-control-label">Willaya</label>
                    <Input
                      value={state.willaya}
                      type="text"
                      onChange={(e) =>
                        setState({ ...state, willaya: e.target.value })
                      }
                    ></Input>
                  </FormGroup>
                  <FormGroup className="mx-4">
                    <Button
                      color="default"
                      type="button"
                      onClick={() => {
                        axios
                          .put(
                            `/api/Clients/${id}`,
                            objectValuesToUpperCase(state)
                          )
                          .then((res) => router.push("/clients"))
                          .catch((err) => setErrorShown(true));
                      }}
                    >
                      Enregister
                    </Button>
                    {errorShown && (
                      <span className="error">Erreur, réessayer!</span>
                    )}
                  </FormGroup>
                </Form>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Edit;
