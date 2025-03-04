import React from "react";
import AddItemCard from "../../components/AddItemCard/AddItemCard";

const New = () => {
  return (
    <>
      <AddItemCard
        headerTitle={"Ajouter un Client"}
        formMetaData={[
          {
            label: "nom",
            input: "name",
          },
          {
            label: "libele",
            input: "label",
          },
          {
            label: "famille",
            input: "family",
          },
          {
            label: "designation",
            input: "designation",
          },
        ]}
        postRoute="/api/Articles"
        redirectPath="/articles"
      />
    </>
  );
};

export default New;
