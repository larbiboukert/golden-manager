import React from "react";
import { useRouter } from "next/router";
import AddItemCard from "../../../components/AddItemCard/AddItemCard";

const New = () => {
  const router = useRouter();
  const { customerId } = router.query;
  return (
    <>
      <AddItemCard
        headerTitle={"Nouvel versement client"}
        formMetaData={[
          {
            label: "date",
            input: "date",
            type: "date",
            value: new Date().toISOString().split("T")[0],
          },
          {
            label: "titre",
            input: "fineness",
            value: 750,
          },
          {
            label: "qantite or (G)",
            input: "grams",
            value: 0,
          },
          {
            label: "argent (DA)",
            input: "money",
            value: 0,
          },
        ]}
        postRoute={`/api/CustomerPayments?customerId=${customerId}`}
        redirectPath={`/customers/${customerId}`}
      />
    </>
  );
};

export default New;
