import { atom, useAtom } from "jotai";
import { useEffect } from "react";

import { usePrefectures } from "@/hooks/usePrefectures";
import { ResasAPIResponse, ResasPopulation } from "@/models/APIResponseType";
import { PopulationElement } from "@/models/ChartElements";
import { client } from "@/utils/resasClient";


/**
 * 取得済みの都道府県別のデータ
 */
const population = atom<PopulationElement[]>([]);
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
  const { prefs } = usePrefectures();

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

      const prefName = prefs?.find((d) => d.prefCode === prefCode)?.prefName;
      const elm: PopulationElement = {
        prefName: prefName!,
        prefCode: prefCode,
        data: [],
      };
      for (const item of res.data.result.data) {
        elm.data.push({
          label: item.label,
          data: item.data.filter((d) => d.year <= res.data.result.boundaryYear),
        });
      }
      setPopulation([...population, elm]);
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
