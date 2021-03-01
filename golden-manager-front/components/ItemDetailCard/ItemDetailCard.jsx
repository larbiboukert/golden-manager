import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  div,
} from "reactstrap";

const ItemDetailCard = ({
  reference,
  midSection,
  bottomSection,
  error,
  handlePrint,
}) => {
  return (
    <>
      <Card className="shadow">
        {error ? (
          "Erreur, essayer de rafraichir la page!"
        ) : (
          <>
            <CardHeader className="d-flex">
              {reference && (
                <div className="d-flex">
                  <div className="pr-4 uppercase">Reference:</div>
                  <div>{reference}</div>
                </div>
              )}
              {handlePrint && (
                <Button className="uppercase ml-auto" onClick={handlePrint}>
                  <i className="fas fa-print mr-2" />
                  {"imprimer"}
                </Button>
              )}
            </CardHeader>
            <CardBody>
              {midSection.map((data, key) => (
                <div className="d-flex" key={key}>
                  <div className="pr-4 uppercase">{data.label}:</div>
                  <div>{data.value || 0}</div>
                </div>
              ))}
              <div style={{border: "1px solid gray"}} />
              {bottomSection.map((data, key) => (
                <div className="d-flex" key={key}>
                  <div className="pr-4 uppercase">{data.label}:</div>
                  <div>{data.value || 0}</div>
                </div>
              ))}
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
};

export default ItemDetailCard;
