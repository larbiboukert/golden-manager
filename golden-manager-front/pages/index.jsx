import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import useSWR from "swr";
import { fetcher } from "../utils/api";

const dataCard = (title, data, bgClr) => (
  <Card className="w-100 card-stats mb-4 mb-xl-0">
    <CardBody>
      <Row>
        <div className="col">
          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
            {title}
          </CardTitle>
          <span className="h2 font-weight-bold mb-0">{data}</span>
        </div>
        <Col className="col-auto">
          <div
            className={`icon icon-shape bg-${
              bgClr ?? "danger"
            } text-white rounded-circle shadow`}
          >
            <i className="fas fa-chart-bar" />
          </div>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

export default () => {
  const { data, error } = useSWR("/api/Dashboard", fetcher);

  return error ? (
    <div>Error, Refresh the page..</div>
  ) : (
    <>
      <div className="header bg-gradient-dark">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col>
                <Row className="px-4 py-3">
                  {dataCard(
                    "totale des payments clients (argents)",
                    data?.totalMoneyClientsPayments.toFixed(2),
                    "success"
                  )}
                </Row>
                <Row className="px-4 py-3">
                  {dataCard(
                    "totale des payments clients (or)",
                    data?.totalGramsClientsPayments.toFixed(2),
                    "info"
                  )}
                </Row>
                <Row className="px-4 py-3">
                  {dataCard(
                    "totale des ventes (argent)",
                    data?.totalMoneySold.toFixed(2),
                    "danger"
                  )}
                </Row>
                <Row className="px-4 py-3">
                  {dataCard(
                    "totale des ventes (or)",
                    data?.totalGoldSold.toFixed(2),
                    "primary"
                  )}
                </Row>
              </Col>
              <Col>
                <Row className="px-4 py-3">
                  {dataCard(
                    "totale des payments fournisseurs (argents)",
                    data?.totalMoneySuppliersPayments.toFixed(2),
                    "success"
                  )}
                </Row>
                <Row className="px-4 py-3">
                  {dataCard(
                    "totale des payments fournisseurs (or)",
                    data?.totalGramsSuppliersPayments.toFixed(2),
                    "info"
                  )}
                </Row>
                <Row className="px-4 py-3">
                  {dataCard(
                    "totale des achats (argent)",
                    data?.totalMoneySupplied.toFixed(2),
                    "danger"
                  )}
                </Row>
                <Row className="px-4 py-3">
                  {dataCard(
                    "totale des achats (or)",
                    data?.totalGoldSupplied.toFixed(2),
                    "primary"
                  )}
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="px-4 py-3">
                {dataCard(
                  "totale des achats anonymes (argent)",
                  data?.totalMoneyAnonymousPurchses.toFixed(2),
                  "warning"
                )}
              </Col>
              <Col className="px-4 py-3">
                {dataCard(
                  "totale des achats anonymes (or)",
                  data?.totalGramsAnonymousPurchses.toFixed(2),
                  "warning"
                )}
              </Col>
            </Row>
            <Row>
              <Col className="px-4 py-3">
                {dataCard(
                  "totale des charges",
                  data?.totalExpenses.toFixed(2),
                  "primary"
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};
