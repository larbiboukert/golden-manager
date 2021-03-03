import React from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import { useRouter } from "next/router";
import ItemCard from "../../components/ItemCard/ItemCard";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/AnonymousPurchases/${id}`, fetcher);

  return (
    <>
      <ItemCard
        headerSection={{
          reference: data?.reference,
          print: true,
          sections: [
            [
              {
                label: "date",
                value: data?.date,
              },
              {
                label: "titre",
                value: data?.fineness,
              },
              {
                label: "quantite (g)",
                value: data?.grams,
              },
              {
                label: "prix unitaire (da)",
                value: data?.unitPrice,
              },
            ],
            ,
            [
              {
                label: "totale (da)",
                value: data?.total,
              },
            ],
          ],
        }}
        error={error}
      />
    </>
  );
};

export default Detail;
