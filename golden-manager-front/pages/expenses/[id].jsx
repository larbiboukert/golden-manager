import React from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import { useRouter } from "next/router";
import ItemCard from "../../components/ItemCard/ItemCard";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/Expenses/${id}`, fetcher);

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
                label: "montant (DA)",
                value: data?.money,
              },
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

export default Detail;
