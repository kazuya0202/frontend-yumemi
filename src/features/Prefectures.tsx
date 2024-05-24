import { useEffect, useState } from "react";

import { ResasAPIResponse, ResasPrefecture } from "@/models/APIResponseType";
import { client } from "@/utils/resasClient";

export default function Prefectures() {
  const [prefs, setPrefs] = useState<ResasPrefecture[]>();

  useEffect(() => {
    // すでに取得した場合は、再取得しない
    if (prefs) {
      return;
    }

    client
      .get<ResasAPIResponse<ResasPrefecture>>(
        "/api/v1/prefectures",
        { headers: { "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY } }
      )
      .then((res) => {
        setPrefs(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return <>
    <span>都道府県一覧</span>
    <ul>
      {prefs && prefs.map((pref) => <li key={pref.prefCode}>{pref.prefName}</li>)}
    </ul>
  </>;
}
