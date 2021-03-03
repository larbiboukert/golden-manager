import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import ItemCard from "../../../../components/ItemCard/ItemCard";
import { fetcher } from "../../../../utils/api";

const Detail = () => {
  const router = useRouter();
  const { supplyId } = router.query;
  const { data, error } = useSWR(`/api/Supplies/${supplyId}`, fetcher);

  return (
    <>
      <ItemCard
        headerSection={{
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
                label: "totale (DA)",
                value: data?.total,
              },
            ],
          ],
        }}
        navItemsMetaData={[
          {
            navId: 0,
            navTitle: "articles",
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
              data: data?.products.$values,
            },
          },
        ]}
        error={error}
      />
    </>
  );
};

export default Detail;
