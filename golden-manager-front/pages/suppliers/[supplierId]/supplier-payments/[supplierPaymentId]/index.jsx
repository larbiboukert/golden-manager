import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import ItemCard from "../../../../../components/ItemCard/ItemCard";
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
      <ItemCard
        headerSection={{
          print: true,
          reference: data?.reference,
          sections: [
            [
              {
                label: "date",
                value: data?.date,
              },
            ],
            [
              {
                label: "argent versee (DA)",
                value: data?.money,
              },
              {
                label: "or versee (g)",
                value: data?.grams,
              },
              {
                label: "titre",
                value: data?.fineness,
              },
            ],
          ],
        }}
        navItemsMetaData={[
          {
            navId: 0,
            navTitle: "detail",
            addItemButtonText:
              data?.laboratoryReports.$values.length === 0 && "pv",
            addItemRoutePath: `/suppliers/${supplierId}/supplier-payments/${supplierPaymentId}/new`,
            table: {
              hideRef: true,
              metaData: [
                {
                  label: "reference client",
                  propName: "customer",
                  subPropName: "reference",
                  ifNull: "ANONYME",
                },
                { label: "or versee", propName: "payedGold" },
                { label: "fonte", propName: "melting" },
                { label: "titre", propName: "fineness" },
                { label: "net", propName: "net" },
                { label: "ecart", propName: "gap" },
              ],
              data: data?.laboratoryReports.$values,
            },
          },
        ]}
        error={error}
      />
    </>
  );
};

export default Detail;
