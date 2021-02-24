import React from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import { useRouter } from "next/router";
import ItemDetailCard from "../../components/ItemDetailCard/ItemDetailCard";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/AnonymousPurchases/${id}`, fetcher);

  return (
    <>
      <ItemDetailCard
        reference={data?.reference}
        midSection={[
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
            label: "montant (da)",
            value: data?.money,
          },
        ]}
        bottomSection={[
          {
            label: "designation",
            value: data?.designation,
          },
        ]}
        error={error}
      />
    </>
  );
};

export default Detail;
