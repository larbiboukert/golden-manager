import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
import Header from "../../components/Header/Header";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  const { data, error } = useSWR("/api/Fournisseurs", fetcher);
  const [itemsList, setItemsList] = useState();
  useEffect(() => {
    setItemsList(data);
  }, [data]);

  return (
    <>
      <Header
        brandText={"Fournisseurs"}
        data={data}
        setFilteredList={setItemsList}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow list">
              <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                <h3 className="capitalize mb-0">{"Liste des Fournisseurs"}</h3>
                <Button onClick={() => router.push("/fournisseurs/new")}>
                  Ajouter
                  <i className="fas fa-plus ml-3" />
                </Button>
              </CardHeader>
              {error ? (
                "Echec, essayer de rafrechir la page.."
              ) : (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Reference</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Telephone</th>
                      <th scope="col">Ville</th>
                      <th scope="col">Willaya</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!itemsList ? (
                      <tr>
                        <td>loading...</td>
                      </tr>
                    ) : itemsList.length === 0 ? (
                      <tr>
                        <td>Vide</td>
                      </tr>
                    ) : (
                      itemsList.map((row) => (
                        <tr key={row.id}>
                          <th
                            className="nav-item"
                            scope="row"
                            onClick={(e) =>
                              router.push(`/fournisseurs/${row.id}`)
                            }
                          >
                            <span className="mb-0 text-sm">
                              {row.reference}
                            </span>
                          </th>
                          <td>{row.nom}</td>
                          <td>{row.telephone}</td>
                          <td>{row.ville}</td>
                          <td>{row.willaya}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Index;
