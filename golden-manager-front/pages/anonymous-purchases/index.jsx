import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import ItemsListTableCard from "../../components/ItemsListTableCard/ItemsListTableCard";
import ItemDetailCard from "../../components/ItemDetailCard/ItemDetailCard";

const Index = () => {
  const { data: anonymousPurchases, error1 } = useSWR(
    "/api/AnonymousPurchases",
    fetcher
  );
  const [totalGrams, setTotalGrams] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [median, setMedian] = useState(0);
  useEffect(() => {
    if (anonymousPurchases && anonymousPurchases.$values.length !== 0) {
      setTotalGrams(
        anonymousPurchases.$values.reduce((acc, cur) => acc + cur.grams, 0)
      );
      setTotalMoney(
        anonymousPurchases.$values.reduce((acc, cur) => acc + cur.total, 0)
      );
    }
  }, [anonymousPurchases]);
  useEffect(() => {
    if (totalGrams !== 0) setMedian(totalMoney / totalGrams);
  }, [totalGrams]);

  const { data: anonymousLaboratoryReports, error2 } = useSWR(
    "/api/LaboratoryReports/anonymous",
    fetcher
  );
  const [totalGap, setTotalGap] = useState();
  useEffect(() => {
    if (anonymousLaboratoryReports)
      setTotalGap(
        anonymousLaboratoryReports.$values.reduce(
          (acc, cur) => acc + cur.gap,
          0
        )
      );
  }, [anonymousLaboratoryReports]);

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
          {
            label: "totale des moyennes ponderees",
            value: median.toFixed(2),
          },
        ]}
        bottomSection={[
          {
            label: "totale des ecarts",
            value: totalGap,
          },
          {
            label: "quantite totale achetee avec ecart (g)",
            value: totalGrams - totalGap,
          },
        ]}
        error={error1 || error2}
        handlePrint={() => {}}
      />
      <ItemsListTableCard
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
                { label: "prix unitaire (da)", propName: "unitPrice" },
                { label: "totale (da)", propName: "total" },
              ],
              data: anonymousPurchases?.$values,
            },
          },
          {
            navName: "versements anomymes",
            table: {
              hideRef: true,
              metaData: [
                {
                  label: "reference versement",
                  propName: "supplierPayment",
                  subPropName: "reference",
                },
                { label: "or versee", propName: "payedGold" },
                { label: "fonte", propName: "melting" },
                { label: "titre", propName: "fineness" },
                { label: "net", propName: "net" },
                { label: "ecart", propName: "gap" },
              ],
              data: anonymousLaboratoryReports?.$values,
            },
          },
        ]}
        error={error1 || error2}
      />
    </>
  );
};

export default Index;
