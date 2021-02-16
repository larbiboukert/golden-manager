import React from "react";
import AddItemCard from "../../components/AddItemCard/AddItemCard";

const New = () => {
  return (
    <>
      <AddItemCard
        headerTitle={"Ajouter un Client"}
        formMetaData={[
          {
            label: "Nom",
            input: "name",
          },
          {
            label: "Telephone",
            input: "phoneNumber",
          },
          {
            label: "Ville",
            input: "city",
          },
          {
            label: "Willaya",
            input: "state",
          },
        ]}
        postRoute="/api/Customers"
        redirectPath="/customers"
      />
    </>
  );
};

export default New;
