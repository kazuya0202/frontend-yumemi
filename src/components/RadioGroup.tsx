import React from "react";

import styles from "./RadioGroup.module.scss";

import { PopulationKind } from "@/models/APIResponseType";

type Props = {
  options: PopulationKind[];
  value: PopulationKind;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioGroup({ options, value, onChange }: Props) {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return <>
    <div className={styles.group}>
      {options.map((opt) => (
        <div key={opt}>
          <label>
            <input
              type="radio"
              value={opt}
              checked={value === opt}
              onChange={handleRadioChange}
            />
            {opt}
          </label>
        </div>
      ))}
    </div>
  </>;
};
