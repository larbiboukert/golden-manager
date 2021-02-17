import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { objectValuesToUpperCase } from "../../utils/functions";

const AddItemCard = ({
  headerTitle,
  formMetaData,
  postRoute,
  redirectPath,
}) => {
  const router = useRouter();
  const [state, setState] = useState();
  const [errorShown, setErrorShown] = useState(false);

  return (
    <>
      <Card className="shadow">
        <CardHeader>
          <h1>{headerTitle}</h1>
        </CardHeader>
        <CardBody>
          <Form>
            {formMetaData.map((data, key) => (
              <FormGroup key={key} className="mx-4">
                <label className="form-control-label capitalize">
                  {data.label}
                </label>
                <Input
                  type={data.type ?? "text"}
                  defaultValue={data.value ?? ""}
                  onChange={(e) =>
                    setState({ ...state, [data.input]: e.target.value })
                  }
                ></Input>
              </FormGroup>
            ))}
            <FormGroup className="mx-4">
              <Button
                color="default"
                type="button"
                onClick={() => {
                  axios
                    .post(postRoute, objectValuesToUpperCase(state))
                    .then((res) => router.push(redirectPath))
                    .catch((err) => setErrorShown(true));
                }}
              >
                Ajouter
              </Button>
              {errorShown && <span className="error">Erreur, réessayer!</span>}
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default AddItemCard;
