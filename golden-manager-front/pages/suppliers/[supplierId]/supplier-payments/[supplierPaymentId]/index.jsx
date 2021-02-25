import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import ItemDetailCard from "../../../../../components/ItemDetailCard/ItemDetailCard";
import ItemsListTableCard from "../../../../../components/ItemsListTableCard/ItemsListTableCard";
import { fetcher } from "../../../../../utils/api";

const Detail = () => {
  const router = useRouter();
  const { supplierId, supplierPaymentId } = router.query;
  const { data, error } = useSWR(
    `/api/SupplierPayments/${supplierPaymentId}`,
    fetcher
  );

  return (
    <>
      <ItemDetailCard
        reference={data?.reference}
        midSection={[
          {
            label: "date",
            value: data?.date,
          },
        ]}
        bottomSection={[
          {
            label: "argent versee (DA)",
            value: data?.money,
          },
          {
            label: "or versee (g)",
            value: data?.grams,
          },
        ]}
      />
      <ItemsListTableCard
        headerTitle={"pv"}
        navItemsMetaData={[
          {
            navName: "detail",
            addItemButtonText: data?.laboratoryReports.length === 0 && "pv",
            addItemRoutePath: `/suppliers/${supplierId}/supplier-payments/${supplierPaymentId}/new`,
            table: {
              hideRef: true,
              metaData: [
                {
                  label: "reference client",
                  propName: "customer",
                  subPropName: "reference",
                  ifNull: "ANONYME"
                },
                { label: "or versee", propName: "payedGold" },
                { label: "fonte", propName: "melting" },
                { label: "titre", propName: "fineness" },
                { label: "net 750", propName: "net750" },
                { label: "ecart", propName: "gap" },
              ],
              data: data?.laboratoryReports,
            },
          },
        ]}
        error={error}
      />
    </>
  );
};

export default Detail;
