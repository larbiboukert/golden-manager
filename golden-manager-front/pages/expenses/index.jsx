import React from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import ItemsListTableCard from "../../components/ItemsListTableCard/ItemsListTableCard";

const Index = () => {
  const { data, error } = useSWR("/api/Expenses", fetcher);

  return (
    <>
      <ItemsListTableCard
        headerTitle={"Liste des charges"}
        navItemsMetaData={[
          {
            navName: "charges",
            addItemButtonText: "charge",
            addItemRoutePath: `/expenses/new`,
            table: {
              itemBaseRoutePath: "/expenses",
              metaData: [
                { label: "date", propName: "date" },
                { label: "designation", propName: "designation" },
                { label: "montant (DA)", propName: "money" },
              ],
              data: data,
            },
          },
        ]}
        error={error}
      />
    </>
  );
};

export default Index;
