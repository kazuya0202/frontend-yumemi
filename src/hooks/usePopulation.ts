import { atom, useAtom } from "jotai";
import { useEffect } from "react";

import { ResasAPIResponse, ResasPopulation } from "@/models/APIResponseType";
import { client } from "@/utils/resasClient";


type PopulationItem = {
  prefCode: number;
  data: ResasPopulation[];
}

/**
 * 取得済みの都道府県別のデータ
 */
const population = atom<PopulationItem[]>([]);
export const useFetchedPopulation = () => {
  const [_population, setPopulation] = useAtom(population);
  return { population: _population, setPopulation };
};

/**
 * 選択済みの都道府県コード
 */
const selectedPrefCodesAtom = atom<Set<number>>(new Set<number>());
export const useSelectedPrefCodes = () => {
  const [selectedPrefCodes, setSelectedPrefCodes] = useAtom(selectedPrefCodesAtom);
  return { selectedPrefCodes, setSelectedPrefCodes };
};

export const useFetchPopulation = () => {
  const { selectedPrefCodes, setSelectedPrefCodes } = useSelectedPrefCodes();
  const { population, setPopulation } = useFetchedPopulation();

  useEffect(() => {
    const fetchPopulationData = async (prefCode: number) => {
      // console.log(`fetch ${prefCode}`);
      const res = await client
        .get<ResasAPIResponse<ResasPopulation>>(
          "/api/v1/population/composition/perYear",
          {
            params: { cityCode: "-", prefCode: prefCode },
            headers: { "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY }
          }
        );
      setPopulation([...population, { prefCode: prefCode, data: res.data.result }]);
      setSelectedPrefCodes(new Set([...selectedPrefCodes, prefCode]));
    };

    for (const prefCode of selectedPrefCodes) {
      if (population.find((p) => p.prefCode === prefCode)) {
        // console.log(`skip ${prefCode}`);
        continue;
      }

      fetchPopulationData(prefCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrefCodes, setSelectedPrefCodes]);
};
