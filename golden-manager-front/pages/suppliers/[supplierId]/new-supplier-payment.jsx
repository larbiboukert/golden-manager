import React from "react";
import { useRouter } from "next/router";
import AddItemCard from "../../../components/AddItemCard/AddItemCard";

const New = () => {
  const router = useRouter();
  const { supplierId } = router.query;
  return (
    <>
      <AddItemCard
        headerTitle={"Nouvel versement fournisseur"}
        formMetaData={[
          {
            label: "date",
            input: "date",
            type: "date",
            value: new Date().toISOString().split("T")[0],
          },
          {
            label: "argent (DA)",
            input: "money",
            value: 0,
          },
          {
            label: "qantite or (G)",
            input: "grams",
            value: 0,
          },
        ]}
        postRoute={`/api/SupplierPayments?supplierId=${supplierId}`}
        redirectPath={`/suppliers/${supplierId}`}
      />
    </>
  );
};

export default New;
