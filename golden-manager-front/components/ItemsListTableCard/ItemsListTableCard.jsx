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

const ItemsListTableCard = ({ headerTitle, navItemsMetaData, error }) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(navItemsMetaData[0].navName);

  const [itemsList, setItemsList] = useState(navItemsMetaData[0].table.data);
  useEffect(() => {
    setItemsList(
      navItemsMetaData.find((md) => md.navName === activeTab).table.data
    );
  }, [navItemsMetaData, activeTab]);

  return (
    <>
      <Card className="shadow">
        <CardHeader className="border-0 d-flex justify-content-between align-items-center">
          <h1>{headerTitle}</h1>
          <SearchBar
            data={
              navItemsMetaData.find((md) => md.navName === activeTab).table.data
            }
            setFilteredList={setItemsList}
          />
          <div className="d-flex ml-4">
            {navItemsMetaData.map((md, key) => (
              <Button
                key={key}
                className="capitalize"
                onClick={() => router.push(md.addItemRoutePath)}
              >
                <i className="fas fa-plus mr-2" />
                {md.addItemButtonText}
              </Button>
            ))}
          </div>
        </CardHeader>
        {error ? (
          "Echec, essayer de rafrechir la page.."
        ) : (
          <CardBody>
            <Nav tabs className="flex-grow-1">
              {navItemsMetaData.map((md, key) => (
                <NavItem key={key}>
                  <NavLink
                    className={`capitalize${
                      activeTab === md.navName && " active"
                    }`}
                    onClick={() => setActiveTab(md.navName)}
                  >
                    {md.navName}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={activeTab}>
              {navItemsMetaData.map((md, key) => (
                <TabPane key={key} tabId={md.navName}>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Reference</th>
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
                            {md.table.metaData.map((col, k) => (
                              <td key={k} scope="col">
                                {row[col.propName]}
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

export default ItemsListTableCard;
