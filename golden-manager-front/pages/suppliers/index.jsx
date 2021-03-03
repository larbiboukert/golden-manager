import React from "react";
import useSWR from "swr";
import ItemCard from "../../components/ItemCard/ItemCard";
import { fetcher } from "../../utils/api";

const Index = () => {
  const { data, error } = useSWR("/api/Suppliers", fetcher);
  return (
    <>
      <ItemCard
        navItemsMetaData={[
          {
            navId: 0,
            navTitle: "fournisseurs",
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
