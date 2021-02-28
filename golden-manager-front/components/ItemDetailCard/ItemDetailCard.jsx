import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Label,
} from "reactstrap";

const ItemDetailCard = ({ reference, midSection, bottomSection, error }) => {
  return (
    <>
      <Card className="shadow">
        {error ? (
          "Erreur, essayer de rafraichir la page!"
        ) : (
          <>
            <CardHeader className="d-flex">
              {reference && (
                <div>
                  <Label className="pr-4 uppercase">Reference:</Label>
                  <Label>{reference}</Label>
                </div>
              )}
              <Button className="uppercase ml-auto">
                <i className="fas fa-print mr-2" />
                {"imprimer"}
              </Button>
            </CardHeader>
            <CardBody>
              {midSection.map((data, key) => (
                <FormGroup key={key}>
                  <Label className="pr-4 uppercase">{data.label}:</Label>
                  <Label>{data.value || 0}</Label>
                </FormGroup>
              ))}
              <hr />
              {bottomSection.map((data, key) => (
                <FormGroup key={key}>
                  <Label className="pr-4 uppercase">{data.label}:</Label>
                  <Label>{data.value || 0}</Label>
                </FormGroup>
              ))}
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
};

export default ItemDetailCard;
