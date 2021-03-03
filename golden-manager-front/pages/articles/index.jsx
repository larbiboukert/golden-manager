import React from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import ItemCard from "../../components/ItemCard/ItemCard";

const Index = () => {
  const { data, error } = useSWR("/api/Articles", fetcher);

  return (
    <>
      <ItemCard
        headerTitle={"Liste des articles"}
        navItemsMetaData={[
          {
            navId: 0,
            navTitle: "articles",
            addItemButtonText: "article",
            addItemRoutePath: `/articles/new`,
            table: {
              itemBaseRoutePath: "/articles",
              metaData: [
                { label: "Nom", propName: "name" },
                { label: "Libele", propName: "label" },
                { label: "Famille", propName: "family" },
                { label: "Designation", propName: "designation" },
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
