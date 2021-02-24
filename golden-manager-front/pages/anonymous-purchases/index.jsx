import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import ItemsListTableCard from "../../components/ItemsListTableCard/ItemsListTableCard";
import ItemDetailCard from "../../components/ItemDetailCard/ItemDetailCard";

const Index = () => {
  const { data, error } = useSWR("/api/AnonymousPurchases", fetcher);

  const [totalGrams, setTotalGrams] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [median, setMedian] = useState(0);
  useEffect(() => {
    if (data && data.length !== 0) {
      setTotalGrams(data.reduce((acc, cur) => acc + cur.grams, 0));
      setTotalMoney(data.reduce((acc, cur) => acc + cur.money, 0));
    }
  }, [data]);
  useEffect(() => {
    if (totalGrams !== 0)
      setMedian(
        data.reduce((acc, cur) => acc + cur.grams * cur.fineness, 0) /
          totalGrams
      );
  }, [totalGrams]);

  return (
    <>
      <ItemDetailCard
        midSection={[
          {
            label: "quantite totale achetee (g)",
            value: totalGrams,
          },
          {
            label: "argent totale verse (da)",
            value: totalMoney,
          },
        ]}
        bottomSection={[
          {
            label: "totale des moyennes ponderees",
            value: median.toFixed(2),
          },
        ]}
        error={error}
      />
      <ItemsListTableCard
        headerTitle={"liste des achats anonymes"}
        navItemsMetaData={[
          {
            navName: "achats anomymes",
            addItemButtonText: "achat anonyme",
            addItemRoutePath: `/anonymous-purchases/new`,
            table: {
              itemBaseRoutePath: "/anonymous-purchases",
              metaData: [
                { label: "date", propName: "date" },
                { label: "titre", propName: "fineness" },
                { label: "quantite (g)", propName: "grams" },
                { label: "montant (da)", propName: "money" },
                { label: "designation", propName: "designation" },
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
