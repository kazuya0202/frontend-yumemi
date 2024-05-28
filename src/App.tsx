import { useState } from "react";

import { useFetchPopulation, useSelectedPrefCodes, useFetchedPopulation } from "./hooks/usePopulation";
import { usePrefectures } from "./hooks/usePrefectures";

import Prefectures from "@/features/Prefectures";

import "./App.scss";

function App() {
  const { prefs, isPending, isError, error } = usePrefectures();
  const { population } = useFetchedPopulation();
  const { selectedPrefCodes, setSelectedPrefCodes } = useSelectedPrefCodes();

  useFetchPopulation();  // 選択した都道府県別のデータを取得

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prefCode = Number(event.target.value);

    if (selectedPrefCodes.has(prefCode)) {
      selectedPrefCodes.delete(prefCode);
      setSelectedPrefCodes(new Set(selectedPrefCodes));
    } else {
      setSelectedPrefCodes(new Set([...selectedPrefCodes, prefCode]));
    }
  };

  if (isPending) {
    return <div>都道府県のデータ取得中...</div>;
  }
  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <>
      <h1>都道府県別の総人口・人口構成</h1>
      <Prefectures prefs={prefs} onChange={handleCheckboxChange} />

      <p>選択項目</p>
      <span>{[...selectedPrefCodes].join(", ")}</span>
      <p>取得済みデータ</p>
      <span>{population.map((p) => p.prefCode).join(", ")}</span>
    </>
  );
}

export default App;
