import React, { useState } from "react";
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
import axios from "axios";
import { useRouter } from "next/router";
import { objectValuesToUpperCase } from "../../utils/functions";

const New = () => {
  const router = useRouter();

  const [state, setState] = useState({
    nom: "",
    telephone: "",
    ville: "",
    willaya: "",
  });
  console.log(state);
  const [errorShown, setErrorShown] = useState(false);

  return (
    <>
      <Header brandText={"Fournisseurs"} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="capitalize mb-0">{"Ajouter un fournisseur"}</h3>
              </CardHeader>
              <Form>
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
                        .post(
                          "/api/Fournisseurs",
                          objectValuesToUpperCase(state)
                        )
                        .then((res) => router.push("/fournisseurs"))
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
