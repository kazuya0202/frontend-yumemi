import { useState } from "react";

import { usePrefectures } from "./hooks/usePrefectures";

import Prefectures from "@/features/Prefectures";
import "./App.scss";

function App() {
  const { prefs, isPending, isError, error } = usePrefectures();
  const [selectedPrefCodes, setSelectedPrefs] = useState<number[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prefCode = Number(event.target.value);

    if (selectedPrefCodes.includes(prefCode)) {
      setSelectedPrefs(selectedPrefCodes.filter((pref) => pref !== prefCode));
    } else {
      setSelectedPrefs([...selectedPrefCodes, prefCode]);
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
      <ul>
        {selectedPrefCodes.join(", ")}
      </ul>
    </>
  );
}

export default App;
