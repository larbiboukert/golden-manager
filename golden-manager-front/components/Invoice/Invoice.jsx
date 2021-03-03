import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

const Invoice = (infos, detail) => {
  return (
    <Card>
      {infos && (
        <CardHeader>
          {infos.map((data, key) => (
            <FormGroup key={key}>
              <Label className="pr-4 uppercase">{data.label}:</Label>
              <Label>{data.value}</Label>
            </FormGroup>
          ))}
        </CardHeader>
      )}
      {detail && (
        <CardBody>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                {detail.metaData.map((col, key) => (
                  <th key={key} scope="col">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detail.data.map((row) => (
                <tr key={row.id}>
                  {
                    <th className="nav-item" scope="row">
                      <span className="mb-0 text-sm">{row.reference}</span>
                    </th>
                  }
                  {detail.metaData.map((col, key) => (
                    <td key={key} scope="col">
                      {(!row[col.propName]
                        ? col.ifNull
                        : col.subPropName
                        ? row[col.propName][col.subPropName]
                        : row[col.propName]) || 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      )}
    </Card>
  );
};

export default Invoice;
