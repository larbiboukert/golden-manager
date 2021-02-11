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
import Header from "../../../components/Header/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { objectValuesToUpperCase } from "../../../utils/functions";

const New = () => {
  const router = useRouter();
  const { stakeholderType } = router.query;

  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    city: "",
    state: "",
  });
  useEffect(() => {
    setState({
      ...state,
      type: stakeholderType === "fournisseur" ? 0 : stakeholderType === "client" ? 1 : 2,
    });
  }, [stakeholderType]);

  const [errorShown, setErrorShown] = useState(false);

  return (
    <>
      <Header brandText={stakeholderType} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="capitalize mb-0">{`Ajouter un ${stakeholderType}`}</h3>
              </CardHeader>
              <Form>
                <FormGroup className="mx-4">
                  <label className=" form-control-label">Nom</label>
                  <Input
                    value={state.name}
                    type="text"
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup className="mx-4">
                  <label className=" form-control-label">Telephone</label>
                  <Input
                    value={state.phoneNumber}
                    type="tel"
                    onChange={(e) =>
                      setState({ ...state, phoneNumber: e.target.value })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup className="mx-4">
                  <label className=" form-control-label">Ville</label>
                  <Input
                    value={state.city}
                    type="text"
                    onChange={(e) =>
                      setState({ ...state, city: e.target.value })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup className="mx-4">
                  <label className=" form-control-label">Willaya</label>
                  <Input
                    value={state.state}
                    type="text"
                    onChange={(e) =>
                      setState({ ...state, state: e.target.value })
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
                          "/api/Stakeholders",
                          objectValuesToUpperCase(state)
                        )
                        .then((res) => router.push(`/stakeholders/${stakeholderType}`))
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
