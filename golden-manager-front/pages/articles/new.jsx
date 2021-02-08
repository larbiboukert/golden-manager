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
    reference: "",
    nom: "",
    nomReference: "",
    famille: "",
    designation: "",
  });

  const [errorShown, setErrorShown] = useState(false);

  return (
    <>
      <Header brandText={"Article"} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="capitalize mb-0">{"Ajouter un article"}</h3>
              </CardHeader>
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
                  <label className=" form-control-label">Nom Reference</label>
                  <Input
                    value={state.nomReference}
                    type="text"
                    onChange={(e) =>
                      setState({ ...state, nomReference: e.target.value })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup className="mx-4">
                  <label className=" form-control-label">Famille</label>
                  <Input
                    value={state.famille}
                    type="text"
                    onChange={(e) =>
                      setState({ ...state, famille: e.target.value })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup className="mx-4">
                  <label className=" form-control-label">Designation</label>
                  <Input
                    value={state.designation}
                    type="text"
                    onChange={(e) =>
                      setState({ ...state, designation: e.target.value })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup className="mx-4">
                  <Button
                    color="default"
                    type="button"
                    onClick={() => {
                      axios
                        .post("/api/Articles", objectValuesToUpperCase(state))
                        .then((res) => router.push("/articles"))
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
