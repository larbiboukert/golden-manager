import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../../../utils/api";
import ItemCard from "../../../components/ItemCard/ItemCard";

const Index = () => {
  const router = useRouter();
  const { supplierId } = router.query;
  const { data, error } = useSWR(`/api/Suppliers/${supplierId}`, fetcher);

  return (
    <>
      <ItemCard
        headerSection={{
          reference: data?.reference,
          print: true,
          sections: [
            [
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
            ],
            [
              {
                label: "totale ventes (da)",
                value: data?.totalMoneySupplied,
              },
              {
                label: "totale des versements or (g)",
                value: data?.totalGoldSupplied,
              },
              {
                label: "totale des versements argents (da)",
                value: data?.totalSuppliedGold,
              },
              {
                label: "totale des versements or (g)",
                value: data?.totalSuppliedMoney,
              },
              {
                label: "credit argent (da)",
                value: data?.totalMoneyCredit,
              },
              {
                label: "credit or (g)",
                value: data?.totalGoldCredit,
              },
              {
                label: "ecart or (g)",
                value: data?.totalGap,
              },
              {
                label: "credit or avec ecart (g)",
                value: data ? data.totalGoldCredit + data.totalGap : "",
              },
            ],
          ],
        }}
        navItemsMetaData={[
          {
            navId: 0,
            navTitle: "achats",
            addItemButtonText: "achat",
            addItemRoutePath: `/suppliers/${supplierId}/supplies/new`,
            table: {
              itemBaseRoutePath: `/suppliers/${supplierId}/supplies`,
              metaData: [
                { label: "date", propName: "date" },
                { label: "totale argent (da)", propName: "totalMoney" },
                { label: "totale or (da)", propName: "totalGrams" },
              ],
              data: data?.supplies.$values,
            },
          },
          {
            navId: 1,
            navTitle: "versements",
            addItemButtonText: "versement",
            addItemRoutePath: `/suppliers/${supplierId}/supplier-payments/new`,
            table: {
              itemBaseRoutePath: `/suppliers/${supplierId}/supplier-payments`,
              metaData: [
                { label: "date", propName: "date" },
                { label: "argent versee (da)", propName: "money" },
                { label: "or versee (g)", propName: "grams" },
                { label: "titre", propName: "fineness" },
              ],
              data: data?.supplierPayments.$values,
            },
          },
        ]}
        error={error}
      />
    </>
  );
};

export default Index;
