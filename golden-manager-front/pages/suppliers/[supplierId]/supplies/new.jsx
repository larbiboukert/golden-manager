import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../../../utils/api";
import AddInvoiceCard from "../../../../components/AddInvoiceCard/AddInvoiceCard";

const New = () => {
  const router = useRouter();
  const { supplierId } = router.query;

  const { data, error } = useSWR("/api/Articles", fetcher);

  return !data ? (
    "Loading.."
  ) : (
    <>
      <AddInvoiceCard
        headerTitle="ajouter un vente"
        inputItemShape={[
          {
            label: "article",
            propName: "article",
            type: "select",
            initVal: { id: data?.$values[0].id },
          },
          {
            label: "quantite or (g):",
            propName: "grams",
            initVal: 0,
          },
          {
            label: "prox unitaire:",
            propName: "unitPrice",
            initVal: 0,
          },
        ]}
        selectInputItems={[
          ...data?.$values.map((article) => ({
            label: article.reference,
            value: article.id,
          })),
        ]}
        itemsName={"products"}
        initDate={new Date().toISOString().split("T")[0]}
        postUrl={`/api/Supplies?supplierId=${supplierId}`}
        redirectPath={`/suppliers/${supplierId}`}
        error={error}
      />
    </>
  );
};

export default New;
