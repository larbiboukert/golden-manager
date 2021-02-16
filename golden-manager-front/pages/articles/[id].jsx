import React from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import { useRouter } from "next/router";
import ItemDetailCard from "../../components/ItemDetailCard/ItemDetailCard";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/Articles/${id}`, fetcher);

  return (
    <>
      <ItemDetailCard
        reference={data?.reference}
        midSection={[
          {
            label: "nom",
            value: data?.name,
          },
          {
            label: "libele",
            value: data?.label,
          },
          {
            label: "famille",
            value: data?.family,
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

export default Edit;
