import React from "react";
import AddItemCard from "../../components/AddItemCard/AddItemCard";

const New = () => {
  return (
    <>
      <AddItemCard
        headerTitle={"ajouter un achat anonyme"}
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
            value: 0,
          },
          {
            label: "quantite (g)",
            input: "grams",
            value: 0,
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
        postRoute="/api/AnonymousPurchases"
        redirectPath="/anonymous-purchases"
      />
    </>
  );
};

export default New;
