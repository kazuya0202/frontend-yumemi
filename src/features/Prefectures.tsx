import styles from "./Prefectures.module.scss";

import Badge from "@/components/Badge";
import Checkbox from "@/components/Checkbox";
import { ResasPrefecture } from "@/models/APIResponseType";

type Props = {
  prefs: ResasPrefecture[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Prefectures({ prefs, onChange }: Props) {
  return <>
    <section>
      <Badge>都道府県</Badge>
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
