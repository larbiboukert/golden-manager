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
import { fetcher } from "../../../../../utils/api";

const New = () => {
  const router = useRouter();
  const { supplierId, supplierPaymentId } = router.query;

  const [state, setState] = useState({
    items: [],
  });

  const { data: selectInputItems, error } = useSWR("/api/Customers", fetcher);

  const [newItem, setNewItem] = useState();
  console.log(newItem?.customer);
  useEffect(() => {
    setNewItem({
      customer: null,
      payedGold: 0,
      melting: 0,
      fineness: 0,
    });
  }, [state.items, selectInputItems]);

  const [errorShown, setErrorShown] = useState(false);
  useEffect(() => setErrorShown(false), [state]);

  return (
    <>
      <Card className="shadow">
        <CardHeader className="border-0">
          <h3 className="uppercase mb-0">{"detail pv"}</h3>
        </CardHeader>
        <Form>
          <FormGroup className="mx-4">
            <ListGroup flush>
              {state.items.map((item, index) => (
                <ListGroupItem key={index} className="py-0">
                  <Row className="my-1 align-items-center">
                    <i
                      className="fas fa-minus nav-item"
                      onClick={() => {
                        setState({
                          ...state,
                          items: state.items.filter((p, i) => i !== index),
                        });
                      }}
                    />
                    <div className="d-flex col">
                      <h5 className="mx-2 mb-0">
                        {item.customer === null
                          ? "ANONYME"
                          : selectInputItems.$values.find(
                              (selectInputItem) =>
                                selectInputItem.id == item.customer.id
                            ).reference}
                      </h5>
                    </div>
                    <div className="d-flex col">
                      <small className="uppercase">{"or versee:"}</small>
                      <h5 className="mx-2 mb-0">{item.payedGold}</h5>
                    </div>
                    <div className="d-flex col">
                      <small className="uppercase">{"fonte:"}</small>
                      <h5 className="mx-2 mb-0">{item.melting}</h5>
                    </div>
                    <div className="d-flex col">
                      <small className="uppercase">{"titre:"}</small>
                      <h5 className="mx-2 mb-0">{item.fineness}</h5>
                    </div>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
            <div className="d-flex">
              <div className="d-flex flex-grow-1 align-items-center pr-4">
                <label className="form-control-label pr-2">{"Client"}</label>
                <Input
                  type="select"
                  value={newItem?.customer?.id}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      customer:
                        e.target.value === "" ? null : { id: e.target.value },
                    })
                  }
                >
                  {error ? (
                    <option>Erreur! rafraichir la page</option>
                  ) : !selectInputItems ? (
                    <option>Loading..</option>
                  ) : (
                    <>
                      <option value={""}>{"ANONYME"}</option>
                      {selectInputItems.$values.map((selectInputItem) => (
                        <option
                          key={selectInputItem.id}
                          value={selectInputItem.id}
                        >
                          {selectInputItem.reference}
                        </option>
                      ))}
                    </>
                  )}
                </Input>
              </div>
              <div className="d-flex flex-grow-1 align-items-center pr-4">
                <label className="form-control-label pr-2 uppercase">
                  {"or versee:"}
                </label>
                <Input
                  type="text"
                  value={newItem?.payedGold}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      payedGold: e.target.value,
                    })
                  }
                ></Input>
              </div>
              <div className="d-flex flex-grow-1 align-items-center pr-4">
                <label className="form-control-label pr-2 uppercase">
                  {"fonte:"}
                </label>
                <Input
                  type="text"
                  value={newItem?.melting}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      melting: e.target.value,
                    })
                  }
                ></Input>
              </div>
              <div className="d-flex flex-grow-1 align-items-center pr-4">
                <label className="form-control-label pr-2 uppercase">
                  {"titre:"}
                </label>
                <Input
                  type="text"
                  value={newItem?.fineness}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      fineness: e.target.value,
                    })
                  }
                ></Input>
              </div>
              <Button
                className="h-100 align-self-center"
                onClick={() => {
                  setState({
                    ...state,
                    items: [...state.items, newItem],
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
                  .post(
                    `/api/LaboratoryReports?supplierPaymentId=${supplierPaymentId}`,
                    state.items
                  )
                  .then((res) =>
                    router.push(
                      `/suppliers/${supplierId}/supplier-payments/${supplierPaymentId}/`
                    )
                  )
                  .catch((err) => console.log(err));
              }}
            >
              Sauvgarder
            </Button>
            {errorShown && <span className="error">Erreur, réessayer!</span>}
          </FormGroup>
        </Form>
      </Card>
    </>
  );
};

export default New;
