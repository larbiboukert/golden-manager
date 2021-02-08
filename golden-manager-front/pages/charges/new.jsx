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
    date: "",
    designation: "",
    montant: "",
  });
  console.log(state);
  const [errorShown, setErrorShown] = useState(false);

  return (
    <>
      <Header brandText={"Charge"} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="capitalize mb-0">{"Ajouter une charge"}</h3>
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
                  <label className=" form-control-label">Montant (DA)</label>
                  <Input
                    value={state.montant}
                    type="text"
                    onChange={(e) =>
                      setState({ ...state, montant: e.target.value })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup className="mx-4">
                  <Button
                    color="default"
                    type="button"
                    onClick={() => {
                      axios
                        .post("/api/Charges", objectValuesToUpperCase(state))
                        .then((res) => router.push("/charges"))
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
