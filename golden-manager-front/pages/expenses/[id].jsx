import React from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import { useRouter } from "next/router";
import ItemDetailCard from "../../components/ItemDetailCard/ItemDetailCard";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/Expenses/${id}`, fetcher);

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
            label: "montant (DA)",
            value: data?.money,
          },
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
