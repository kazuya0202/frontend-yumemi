import { usePrefectures } from "@/hooks/usePrefectures";

export default function Prefectures() {
  const { prefs, isPending, isError, error } = usePrefectures();

  if (isPending) {
    return <div>都道府県のデータ取得中...</div>;
  }
  if (isError) {
    return <div>{error?.message}</div>;
  }
  return <>
    <span>都道府県一覧</span>
    <ul>
      {prefs && prefs.map((pref) => <li key={pref.prefCode}>{pref.prefName}</li>)}
    </ul>
  </>;
}
