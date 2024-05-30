import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { usePrefectures } from "@/hooks/usePrefectures";
import { ResasAPIResponse, ResasPopulation } from "@/models/APIResponseType";
import { PopulationElement } from "@/models/ChartElements";
import { HEADERS, client } from "@/utils/resasClient";

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

  const isFetchingAPI = useRef<boolean>(false);

  const fetchPopulationData = async (prefCode: number) => {
    const res = await client
      .get<ResasAPIResponse<ResasPopulation>>(
        "/api/v1/population/composition/perYear",
        {
          params: { cityCode: "-", prefCode: prefCode },
          headers: HEADERS,
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
    isFetchingAPI.current = false;
  };

  useEffect(() => {
    // 人口構成データを取得中なら return（同時に1つだけ実行する）
    if (isFetchingAPI.current) {
      return;
    }

    for (const prefCode of selectedPrefCodes) {
      // すでに取得している場合はスキップ
      if (population.find((p) => p.prefCode === prefCode)) {
        continue;
      }

      isFetchingAPI.current = true;
      fetchPopulationData(prefCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrefCodes, setSelectedPrefCodes]);
};
