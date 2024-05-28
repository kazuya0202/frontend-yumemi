import styles from "./Prefectures.module.scss";

import Checkbox from "@/components/Checkbox";
import { ResasPrefecture } from "@/models/APIResponseType";

type Props = {
  prefs: ResasPrefecture[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Prefectures({ prefs, onChange }: Props) {
  return <>
    <span>都道府県</span>
    <section className={styles.prefectures}>
      {prefs && prefs.map((pref) => {
        return <Checkbox key={pref.prefCode} value={pref.prefCode} onChange={onChange}>
          {pref.prefName}
        </Checkbox>;
      }
      )}
    </section>
  </>;
}
