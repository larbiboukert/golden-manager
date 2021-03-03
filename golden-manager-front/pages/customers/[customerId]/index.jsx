import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../../../utils/api";
import ItemCard from "../../../components/ItemCard/ItemCard";

const Index = () => {
  const router = useRouter();
  const { customerId } = router.query;
  const { data, error } = useSWR(`/api/Customers/${customerId}`, fetcher);

  return (
    <>
      <ItemCard
        headerSection={{
          reference: data?.reference,
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
                label: "totale ventes argent (da)",
                value: data?.totalMoneySold,
              },
              {
                label: "totale ventes or (g)",
                value: data?.totalGoldSold,
              },
              {
                label: "totale des versements argents (DA)",
                value: data?.totalPayedMoney,
              },
              {
                label: "totale des versements or (g)",
                value: data?.totalPayedGold,
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
            navTitle: "ventes",
            addItemButtonText: "vente",
            addItemRoutePath: `/customers/${customerId}/sales/new`,
            table: {
              itemBaseRoutePath: `/customers/${customerId}/sales`,
              metaData: [
                { label: "date", propName: "date" },
                { label: "totale argent (da)", propName: "totalMoney" },
                { label: "totale or (g)", propName: "totalGrams" },
              ],
              data: data?.sales.$values,
            },
          },
          {
            navId: 1,
            navTitle: "versements",
            addItemButtonText: "versement",
            addItemRoutePath: `/customers/${customerId}/new-customer-payment`,
            table: {
              metaData: [
                { label: "date", propName: "date" },
                { label: "titre", propName: "fineness" },
                { label: "argent versee (da)", propName: "money" },
                { label: "or versee (g)", propName: "grams" },
              ],
              data: data?.customerPayments.$values,
            },
          },
        ]}
        error={error}
      />
    </>
  );
};

export default Index;
