import React from "react";
import useSWR from "swr";
import ItemsListTableCard from "../../components/ItemsListTableCard/ItemsListTableCard";
import { fetcher } from "../../utils/api";

const Index = () => {
  const { data, error } = useSWR("/api/Customers", fetcher);
  return (
    <>
      <ItemsListTableCard
        headerTitle={"Liste des clients"}
        navItemsMetaData={[
          {
            navName: "clients",
            addItemButtonText: "client",
            addItemRoutePath: `/customers/new`,
            table: {
              itemBaseRoutePath: "/customers",
              metaData: [
                { label: "Nom", propName: "name" },
                { label: "Telephone", propName: "phoneNumber" },
                { label: "Ville", propName: "city" },
                { label: "Willaya", propName: "state" },
              ],
              data: data?.$values,
            },
          },
        ]}
        error={error}
      />
    </>
  );
};

export default Index;
