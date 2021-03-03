import React from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import ItemCard from "../../components/ItemCard/ItemCard";

const Index = () => {
  const { data, error } = useSWR("/api/Expenses", fetcher);
  return (
    <>
      <ItemCard
        headerSection={{
          sections: [
            [
              {
                label: "total",
                value: data?.$values.reduce((acc, cur) => acc + cur.money, 0),
              },
            ],
          ],
        }}
        navItemsMetaData={[
          {
            navId: 0,
            navTitle: "charges",
            addItemButtonText: "charge",
            addItemRoutePath: `/expenses/new`,
            table: {
              itemBaseRoutePath: "/expenses",
              metaData: [
                { label: "date", propName: "date" },
                { label: "montant (da)", propName: "money" },
                { label: "designation", propName: "designation" },
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
