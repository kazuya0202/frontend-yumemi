import styles from "./Prefectures.module.scss";

import Badge from "@/components/Badge";
import Checkbox from "@/components/Checkbox";
import { useSelectedPrefCodes } from "@/hooks/usePopulation";
import { ResasPrefecture } from "@/models/APIResponseType";

type Props = {
  prefs: ResasPrefecture[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Prefectures({ prefs, onChange }: Props) {
  const { selectedPrefCodes } = useSelectedPrefCodes();

  return <>
    <section>
      <div className={styles.title}>
        <Badge>都道府県</Badge>
        {selectedPrefCodes.size > 0 &&
          <p>
            {selectedPrefCodes.size}
            <span className={styles.label}>項目選択中</span>
          </p>
        }
      </div>
      <div className={styles.prefectures}>
        {prefs && prefs.map((pref) => {
          return <Checkbox key={pref.prefCode} value={pref.prefCode} onChange={onChange}>
            {pref.prefName}
          </Checkbox>;
        }
        )}
      </div>
    </section>
  </>;
}
