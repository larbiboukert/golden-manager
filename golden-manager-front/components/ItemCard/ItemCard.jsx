import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Table,
  Button,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { useRouter } from "next/router";
import SearchBar from "../SearchBar/SearchBar";

const ItemCard = ({ headerSection, navItemsMetaData, error }) => {
  const { reference, print, sections } = headerSection || {};

  const router = useRouter();

  const [activeTab, setActiveTab] = useState(0);

  const [itemsList, setItemsList] = useState();
  useEffect(() => {
    if (navItemsMetaData)
      setItemsList(
        navItemsMetaData.find((md) => md.navId === activeTab).table.data
      );
  }, [navItemsMetaData, activeTab]);

  return error ? (
    <div>{"Error! refrech the page.."}</div>
  ) : (
    <>
      <Card className="shadow">
        {headerSection && (
          <CardHeader>
            <div className="d-flex">
              {reference && (
                <div className="d-flex">
                  <div className="pr-4 uppercase">Reference:</div>
                  <div>{reference}</div>
                </div>
              )}
              {print && (
                <Button className="uppercase ml-auto">
                  <i className="fas fa-print mr-2" />
                  {"imprimer"}
                </Button>
              )}
            </div>
            {sections.map((section, key) => (
              <div key={key}>
                <div style={{ border: "1px solid gray" }} />
                {section.map((data, key) => (
                  <div className="d-flex" key={key}>
                    <div className="pr-4 uppercase">{data.label}:</div>
                    <div>{data.value || 0}</div>
                  </div>
                ))}
              </div>
            ))}
          </CardHeader>
        )}
        {navItemsMetaData && (
          <CardBody>
            <div className="border-0 d-flex justify-content-between align-items-center">
              <SearchBar
                data={
                  navItemsMetaData.find((md) => md.navId === activeTab).table
                    .data
                }
                setFilteredList={setItemsList}
                dateFilter={navItemsMetaData
                  .find((md) => md.navId === activeTab)
                  .table.metaData.some(
                    (md) => md.label.toLowerCase() === "date"
                  )}
              />
              <div className="d-flex ml-4">
                {navItemsMetaData.map(
                  (md, key) =>
                    md.addItemButtonText && (
                      <Button
                        key={key}
                        className="uppercase"
                        onClick={() => router.push(md.addItemRoutePath)}
                      >
                        <i className="fas fa-plus mr-2" />
                        {md.addItemButtonText}
                      </Button>
                    )
                )}
              </div>
            </div>
            <Nav tabs className="flex-grow-1 mt-2">
              {navItemsMetaData.map((md, key) => (
                <NavItem key={key}>
                  <NavLink
                    className={`uppercase${
                      activeTab === md.navId && " active"
                    }`}
                    onClick={() => setActiveTab(md.navId)}
                  >
                    {md.navTitle}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={activeTab}>
              {navItemsMetaData.map((md, key) => (
                <TabPane key={key} tabId={md.navId}>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        {!md.table.hideRef && <th scope="col">Reference</th>}
                        {md.table.metaData.map((col, k) => (
                          <th key={k} scope="col">
                            {col.label}
                          </th>
                        ))}
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
                            {!md.table.hideRef && (
                              <th
                                className="nav-item"
                                scope="row"
                                onClick={(e) =>
                                  md.table.itemBaseRoutePath &&
                                  router.push(
                                    `${md.table.itemBaseRoutePath}/${row.id}`
                                  )
                                }
                              >
                                <span className="mb-0 text-sm">
                                  {row.reference}
                                </span>
                              </th>
                            )}
                            {md.table.metaData.map((col, k) => (
                              <td key={k} scope="col">
                                {(!row[col.propName]
                                  ? col.ifNull
                                  : col.subPropName
                                  ? row[col.propName][col.subPropName]
                                  : row[col.propName]) || 0}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </TabPane>
              ))}
            </TabContent>
          </CardBody>
        )}
      </Card>
    </>
  );
};

export default ItemCard;
