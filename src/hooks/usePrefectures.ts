import { atom, useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

import { ResasAPIResponseList, ResasPrefecture } from "@/models/APIResponseType";
import { HEADERS, client } from "@/utils/resasClient";

const prefectures = atom<ResasPrefecture[]>([]);

const prefecturesAtom = atomWithQuery<ResasAPIResponseList<ResasPrefecture>>((get) => ({
  queryKey: ["prefectures", get(prefectures)],
  queryFn: async () => {
    const res = await client
      .get<ResasAPIResponseList<ResasPrefecture>>(
        "/api/v1/prefectures",
        { headers: HEADERS }
      );
    return res.data;
  },
}));

export const usePrefectures = () => {
  const [{ data, isPending, isError, error }] = useAtom(prefecturesAtom);
  return {
    prefs: data?.result,
    isPending,
    isError,
    error,
  };
};
