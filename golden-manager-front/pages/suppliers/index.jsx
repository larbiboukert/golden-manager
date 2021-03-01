import React from "react";
import useSWR from "swr";
import ItemsListTableCard from "../../components/ItemsListTableCard/ItemsListTableCard";
import { fetcher } from "../../utils/api";

const Index = () => {
  const { data, error } = useSWR("/api/Suppliers", fetcher);
  return (
    <>
      <ItemsListTableCard
        headerTitle={"Liste des fournisseurs"}
        navItemsMetaData={[
          {
            navName: "fournisseurs",
            addItemButtonText: "fournisseur",
            addItemRoutePath: `/suppliers/new`,
            table: {
              itemBaseRoutePath: "/suppliers",
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
