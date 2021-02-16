import React from "react";
import AddItemCard from "../../components/AddItemCard/AddItemCard";

const New = () => {
  return (
    <>
      <AddItemCard
        headerTitle={"Ajouter une charge"}
        formMetaData={[
          {
            label: "date",
            input: "date",
            type: "date",
            value: new Date().toISOString().split("T")[0],
          },
          {
            label: "montant (DA)",
            input: "money",
            value: 0,
          },
          {
            label: "designation",
            input: "designation",
            value: 0,
          },
        ]}
        postRoute="/api/Expenses"
        redirectPath="/expenses"
      />
    </>
  );
};

export default New;
