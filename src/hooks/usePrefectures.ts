import { atom, useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

import { ResasAPIResponse, ResasPrefecture } from "@/models/APIResponseType";
import { client } from "@/utils/resasClient";

const prefectures = atom<ResasPrefecture[]>([]);

const prefecturesAtom = atomWithQuery<ResasAPIResponse<ResasPrefecture>>((get) => ({
  queryKey: ["prefectures", get(prefectures)],
  queryFn: async () => {
    const res = await client
      .get<ResasAPIResponse<ResasPrefecture>>(
        "/api/v1/prefectures",
        { headers: { "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY } }
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
