import React from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import { useRouter } from "next/router";
import ItemCard from "../../components/ItemCard/ItemCard";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/Articles/${id}`, fetcher);

  return (
    <>
      <ItemCard
        headerSection={{
          reference: data?.reference,
          sections: [
            [
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
            ],
            [
              {
                label: "designation",
                value: data?.designation,
              },
            ],
          ],
        }}
        error={error}
      />
    </>
  );
};

export default Edit;
