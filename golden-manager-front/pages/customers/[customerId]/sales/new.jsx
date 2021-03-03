import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
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
import useSWR from "swr";
import { fetcher } from "../../../../utils/api";

const New = () => {
  const router = useRouter();
  const { customerId } = router.query;

  const [state, setState] = useState({
    date: new Date().toISOString().split("T")[0],
    products: [],
  });

  const { data: articles, error } = useSWR("/api/Articles", fetcher);

  const [newProduct, setNewProduct] = useState();
  useEffect(() => {
    setNewProduct({
      article: { id: articles ? articles.$values[0].id : "" },
      grams: 0,
      unitPrice: 0,
    });
  }, [state.products, articles]);

  const [errorShown, setErrorShown] = useState(false);
  useEffect(() => setErrorShown(false), [state]);

  return (
    <>
      <Card className="shadow">
        <CardHeader className="border-0">
          <h3 className="uppercase mb-0">{"Ajouter un vente"}</h3>
        </CardHeader>
        <Form>
          <FormGroup className="mx-4">
            <label className=" form-control-label">Date</label>
            <Input
              value={state.date}
              type="date"
              onChange={(e) => setState({ ...state, date: e.target.value })}
            ></Input>
          </FormGroup>
          <FormGroup className="mx-4">
            <label className=" form-control-label">Articles</label>
            <ListGroup flush>
              {state.products.map((product, index) => (
                <ListGroupItem key={index} className="py-0">
                  <Row className="my-1 align-items-center">
                    <i
                      className="fas fa-minus nav-item"
                      onClick={() => {
                        setState({
                          ...state,
                          products: state.products.filter(
                            (p, i) => i !== index
                          ),
                        });
                      }}
                    />
                    <div className="d-flex col">
                      <small>Article:</small>
                      <h5 className="mx-2 mb-0">
                        {
                          articles.$values.find(
                            (article) => article.id == product.article.id
                          ).reference
                        }
                      </h5>
                    </div>
                    <div className="d-flex col">
                      <small>Grammes:</small>
                      <h5 className="mx-2 mb-0">{product.grams}</h5>
                    </div>
                    <div className="d-flex col">
                      <small>Prix unitaire:</small>
                      <h5 className="mx-2 mb-0">{product.unitPrice}</h5>
                      <small>DA</small>
                    </div>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
            <div className="d-flex">
              <div className="d-flex flex-grow-1 align-items-center pr-4">
                <label className="form-control-label pr-2">Article:</label>
                <Input
                  type="select"
                  value={newProduct?.article.id}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      article: { id: e.target.value },
                    })
                  }
                >
                  {error ? (
                    <option>Erreur! rafraichir la page</option>
                  ) : !articles ? (
                    <option>Loading..</option>
                  ) : articles.$values.length === 0 ? (
                    <option>pas d'articles!</option>
                  ) : (
                    articles.$values.map((article) => (
                      <option key={article.id} value={article.id}>
                        {article.reference}
                      </option>
                    ))
                  )}
                </Input>
              </div>
              <div className="d-flex flex-grow-1 align-items-center pr-4">
                <label className="form-control-label pr-2">Grammes:</label>
                <Input
                  type="text"
                  value={newProduct?.grams}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      grams: e.target.value,
                    })
                  }
                ></Input>
              </div>
              <div className="d-flex flex-grow-1 align-items-center pr-4">
                <label className="form-control-label pr-2">
                  Prix Unitaire (DA):
                </label>
                <Input
                  type="text"
                  value={newProduct?.unitPrice}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      unitPrice: e.target.value,
                    })
                  }
                ></Input>
              </div>
              <Button
                className="h-100 align-self-center"
                onClick={() => {
                  setState({
                    ...state,
                    products: [...state.products, newProduct],
                  });
                }}
              >
                <i className="fas fa-plus" />
              </Button>
            </div>
          </FormGroup>
          <FormGroup className="mx-4">
            <Button
              color="default"
              type="button"
              onClick={() => {
                axios
                  .post(`/api/Sales?customerId=${customerId}`, state)
                  .then((res) => router.push(`/customers/${customerId}`))
                  .catch((err) => console.log(err));
              }}
            >
              Ajouter
            </Button>
            {errorShown && <span className="error">Erreur, réessayer!</span>}
          </FormGroup>
        </Form>
      </Card>
    </>
  );
};

export default New;
