import styles from "./Prefectures.module.scss";

import Checkbox from "@/components/Checkbox";
import Title from "@/components/Title";
import { useFetchPopulation, useSelectedPrefCodes } from "@/hooks/usePopulation";
import { usePrefectures } from "@/hooks/usePrefectures";

export default function Prefectures() {
  const { prefs, isPending, isError, error } = usePrefectures();
  const { selectedPrefCodes, setSelectedPrefCodes } = useSelectedPrefCodes();

  useFetchPopulation();  // 選択時に都道府県別のデータを取得

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prefCode = Number(event.target.value);

    if (selectedPrefCodes.has(prefCode)) {
      selectedPrefCodes.delete(prefCode);
      setSelectedPrefCodes(new Set(selectedPrefCodes));
    } else {
      setSelectedPrefCodes(new Set([...selectedPrefCodes, prefCode]));
    }
  };

  const handleClickClearButton = () => {
    setSelectedPrefCodes(new Set());
  };

  return <>
    <section>
      <div className={styles.title}>
        <Title>都道府県</Title>
        {selectedPrefCodes.size > 0 &&
          <>
            <p>
              {selectedPrefCodes.size}
              <span className={styles.label}>項目選択中</span>
            </p>
            <button type="button" onClick={handleClickClearButton}>すべて解除</button>
          </>
        }
      </div>

      {isPending && <p className="message-box">都道府県のデータ取得中...</p>}
      {isError && <p className="error-box">{error?.message}</p>}

      <div className={styles.prefectures}>
        {prefs && prefs.map((pref) => {
          return <Checkbox key={pref.prefCode} value={pref.prefCode} onChange={handleCheckboxChange}>
            {pref.prefName}
          </Checkbox>;
        }
        )}
      </div>
    </section>
  </>;
}
