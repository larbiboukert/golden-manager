import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import ItemDetailCard from "../../../../components/ItemDetailCard/ItemDetailCard";
import ItemsListTableCard from "../../../../components/ItemsListTableCard/ItemsListTableCard";
import { fetcher } from "../../../../utils/api";

const Detail = () => {
  const router = useRouter();
  const { supplyId } = router.query;
  const { data, error } = useSWR(`/api/Supplies/${supplyId}`, fetcher);

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
            label: "totale (DA)",
            value: data?.total,
          },
        ]}
      />
      <ItemsListTableCard
        headerTitle={"detail"}
        navItemsMetaData={[
          {
            navName: "articles",
            table: {
              metaData: [
                {
                  label: "reference article",
                  propName: "article",
                  subPropName: "reference",
                },
                { label: "quantite (g)", propName: "grams" },
                { label: "prix unitaire (da)", propName: "unitPrice" },
              ],
              data: data?.products,
            },
          },
        ]}
        error={error}
      />
    </>
  );
};

export default Detail;
