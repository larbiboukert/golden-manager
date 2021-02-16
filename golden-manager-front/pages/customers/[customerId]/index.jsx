import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../../../utils/api";
import ItemsListTableCard from "../../../components/ItemsListTableCard/ItemsListTableCard";
import ItemDetailCard from "../../../components/ItemDetailCard/ItemDetailCard";

const Index = () => {
  const router = useRouter();
  const { customerId } = router.query;
  const { data, error } = useSWR(`/api/Customers/${customerId}`, fetcher);
  
  return (
    <>
      <ItemDetailCard
        reference={data?.reference}
        midSection={[
          {
            label: "nom",
            value: data?.name,
          },
          {
            label: "telephone",
            value: data?.phoneNumber,
          },
          {
            label: "ville",
            value: data?.city,
          },
          {
            label: "willaya",
            value: data?.state,
          },
        ]}
        bottomSection={[
          {
            label: "totale achats (DA)",
            value: data?.totalSales,
          },
          {
            label: "totale des versements or (g)",
            value: data?.totalPayedGold,
          },
          {
            label: "totale des versements argents (DA)",
            value: data?.totalPayedMoney,
          },
        ]}
      />
      <ItemsListTableCard
        headerTitle={"Ventes et versements client"}
        navItemsMetaData={[
          {
            navName: "ventes",
            addItemButtonText: "vente",
            addItemRoutePath: `/customers/${customerId}/sales/new`,
            table: {
              itemBaseRoutePath: `/customers/${customerId}/sales`,
              metaData: [
                { label: "Date", propName: "date" },
                { label: "totale (da)", propName: "total" },
              ],
              data: data?.sales,
            },
          },
          {
            navName: "versements",
            addItemButtonText: "versement",
            addItemRoutePath: `/customers/${customerId}/new-customer-payment`,
            table: {
              metaData: [
                { label: "Date", propName: "date" },
                { label: "argent versee (da)", propName: "money" },
                { label: "or versee (g)", propName: "grams" },
              ],
              data: data?.customerPayments,
            },
          },
        ]}
        error={error}
      />
    </>
  );
};

export default Index;
