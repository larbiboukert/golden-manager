import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Form,
  FormGroup,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  CardHeader,
} from "reactstrap";
import axios from "axios";
import { useRouter } from "next/router";

const AddInvoiceCard = ({
  headerTitle,
  inputItemShape,
  selectInputItems,
  itemsName,
  initDate,
  postUrl,
  redirectPath,
  error,
}) => {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [date, setDate] = useState(initDate);

  const [newItem, setNewItem] = useState();

  useEffect(() => {
    setNewItem(() => {
      const item = {};
      inputItemShape.map((shape) => (item[shape.propName] = shape.initVal));
      return item;
    });
  }, [items, selectInputItems]);
  console.log(items);
  return (
    <>
      <Card className="shadow">
        <CardHeader className="border-0">
          <h3 className="uppercase mb-0">{headerTitle}</h3>
        </CardHeader>
        <Form>
          {initDate && (
            <FormGroup className="mx-4">
              <label className=" form-control-label">Date</label>
              <Input
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
              ></Input>
            </FormGroup>
          )}
          <FormGroup className="mx-4">
            <ListGroup flush>
              {items.map((item, index) => (
                <ListGroupItem key={index} className="py-0">
                  <Row className="my-1 align-items-center">
                    <i
                      className="fas fa-minus nav-item"
                      onClick={() => {
                        setItems(items.filter((p, i) => i !== index));
                      }}
                    />
                    {inputItemShape.map((shape, key) => (
                      <div key={key} className="d-flex col">
                        <small className="uppercase">{shape.label}</small>
                        <h5 className="mx-2 mb-0">
                          {shape.type === "select"
                            ? selectInputItems.find(
                                (selectInputItem) =>
                                  selectInputItem.value ==
                                  (item[shape.propName]?.id ?? "")
                              )?.label
                            : item[shape.propName]}
                        </h5>
                      </div>
                    ))}
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
            <div className="d-flex">
              {inputItemShape.map((shape, key) => (
                <div
                  key={key}
                  className="d-flex flex-grow-1 align-items-center pr-4"
                >
                  <label className="form-control-label pr-2 uppercase">
                    {shape.label}
                  </label>
                  {shape.type === "select" ? (
                    <Input
                      type="select"
                      value={newItem?.[shape.propName]?.id}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          [shape.propName]:
                            e.target.value === ""
                              ? null
                              : { id: e.target.value },
                        })
                      }
                    >
                      {error ? (
                        <option>Erreur! rafraichir la page</option>
                      ) : !selectInputItems ? (
                        <option>Loading..</option>
                      ) : (
                        <>
                          {selectInputItems.map((selectInputItem) => (
                            <option
                              key={selectInputItem.value}
                              value={selectInputItem.value}
                            >
                              {selectInputItem.label}
                            </option>
                          ))}
                        </>
                      )}
                    </Input>
                  ) : (
                    <Input
                      type="text"
                      value={newItem?.[shape.propName]}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          [shape.propName]: e.target.value,
                        })
                      }
                    ></Input>
                  )}
                </div>
              ))}
              <Button
                className="h-100 align-self-center"
                onClick={() => setItems([...items, newItem])}
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
                    postUrl,
                    initDate ? { date, [itemsName]: items } : items
                  )
                  .then((res) => router.push(redirectPath))
                  .catch((err) => console.log(err));
              }}
            >
              Sauvgarder
            </Button>
          </FormGroup>
        </Form>
      </Card>
    </>
  );
};

export default AddInvoiceCard;
