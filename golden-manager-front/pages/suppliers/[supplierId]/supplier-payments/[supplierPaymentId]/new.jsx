import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../../../../utils/api";
import AddInvoiceCard from "../../../../../components/AddInvoiceCard/AddInvoiceCard";

const New = () => {
  const router = useRouter();
  const { supplierId, supplierPaymentId } = router.query;

  const { data, error } = useSWR("/api/Customers", fetcher);

  return !data ? (
    "Loading.."
  ) : (
    <>
      <AddInvoiceCard
        headerTitle="detail pv"
        inputItemShape={[
          {
            label: "client",
            propName: "customer",
            type: "select",
            initVal: null,
          },
          {
            label: "or versee:",
            propName: "payedGold",
            initVal: 0,
          },
          {
            label: "fonte:",
            propName: "melting",
            initVal: 0,
          },
          {
            label: "titre:",
            propName: "fineness",
            initVal: 750,
          },
        ]}
        selectInputItems={[
          { label: "ANONYME", value: "" },
          ...data?.$values.map((customer) => ({
            label: customer.reference,
            value: customer.id,
          })),
        ]}
        postUrl={`/api/LaboratoryReports?supplierPaymentId=${supplierPaymentId}`}
        redirectPath={`/suppliers/${supplierId}/supplier-payments/${supplierPaymentId}/`}
        error={error}
      />
    </>
  );
};

export default New;
