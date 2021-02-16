import React from "react";
import { Card, CardBody, CardHeader, FormGroup, Label } from "reactstrap";

const ItemDetailCard = ({ reference, midSection, bottomSection, error }) => {
  return (
    <>
      <Card className="shadow">
        {error ? (
          "Erreur, essayer de rafraichir la page!"
        ) : (
          <>
            <CardHeader>
              <Label className="pr-4 capitalize">Reference:</Label>
              <Label>{reference}</Label>
            </CardHeader>
            <CardBody>
              {midSection.map((data, key) => (
                <FormGroup key={key}>
                  <Label className="pr-4 capitalize">{data.label}:</Label>
                  <Label>{data.value}</Label>
                </FormGroup>
              ))}
              <hr />
              {bottomSection.map((data, key) => (
                <FormGroup key={key}>
                  <Label className="pr-4 capitalize">{data.label}:</Label>
                  <Label>{data.value}</Label>
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
