import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../../../utils/api";
import ItemsListTableCard from "../../../components/ItemsListTableCard/ItemsListTableCard";
import ItemDetailCard from "../../../components/ItemDetailCard/ItemDetailCard";

const Index = () => {
  const router = useRouter();
  const { supplierId } = router.query;
  const { data, error } = useSWR(`/api/Suppliers/${supplierId}`, fetcher);

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
            value: data?.totalSupplies,
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
        headerTitle={"Achats et versements fournisseur"}
        navItemsMetaData={[
          {
            navName: "achats",
            addItemButtonText: "achat",
            addItemRoutePath: `/suppliers/${supplierId}/supplies/new`,
            table: {
              itemBaseRoutePath: `/suppliers/${supplierId}/supplies`,
              metaData: [
                { label: "date", propName: "date" },
                { label: "totale (da)", propName: "total" },
              ],
              data: data?.supplies,
            },
          },
          {
            navName: "versements",
            addItemButtonText: "versement",
            addItemRoutePath: `/suppliers/${supplierId}/supplier-payments/new`,
            table: {
              itemBaseRoutePath: `/suppliers/${supplierId}/supplier-payments`,
              metaData: [
                { label: "date", propName: "date" },
                { label: "argent versee (da)", propName: "money" },
                { label: "or versee (g)", propName: "grams" },
              ],
              data: data?.supplierPayments,
            },
          },
        ]}
        error={error}
      />
    </>
  );
};

export default Index;
