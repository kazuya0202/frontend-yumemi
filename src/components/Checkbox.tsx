import { useRef } from "react";

import styles from "./Checkbox.module.scss";

import { useSelectedPrefCodes } from "@/hooks/usePopulation";

type Props = {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export default function Checkbox({ value, onChange, children }: Props) {
  const { selectedPrefCodes } = useSelectedPrefCodes();
  const timerRef = useRef<number | null>(null);

  // 連続して選択された場合に対応するため 100ms タイムアウトする
  const debounce = (event: React.ChangeEvent<HTMLInputElement>, callbackFn: (evnet: React.ChangeEvent<HTMLInputElement>) => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callbackFn(event);
    }, 100);
  };

  return (
    <div>
      <label className={styles.checkbox} >
        <input type="checkbox" onChange={(e) => debounce(e, onChange)} value={value} checked={selectedPrefCodes.has(value)} />
        {children}
      </label>
    </div>
  );
}
