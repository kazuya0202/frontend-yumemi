import { useEffect, useState } from "react";

import Chart from "@/components/LineChart";
import RadioGroup from "@/components/RadioGroup";
import Title from "@/components/Title";
import { useFetchedPopulation, useSelectedPrefCodes } from "@/hooks/usePopulation";
import { PopulationKind } from "@/models/APIResponseType";
import { PopulationElement } from "@/models/ChartElements";

export default function PopulationChart() {
  const { population } = useFetchedPopulation();
  const { selectedPrefCodes } = useSelectedPrefCodes();

  const [kind, setKind] = useState<PopulationKind>("総人口");
  const [populationData, setPopulationData] = useState<PopulationElement[]>([]);

  /**
   * 人口構成の項目に応じて都道府県別のデータを絞り込む
   * 選択された都道府県を対象に、人口構成の項目を1つにする
   */
  const filterPopulationByKind = () => {
    const populationData = population
      .filter((p) => selectedPrefCodes.has(p.prefCode))
      .map((p) => ({
        data: [p.data.find((d) => d.label === kind)!],
        prefCode: p.prefCode,
        prefName: p.prefName
      }));
    setPopulationData(populationData);
  };

  useEffect(() => {
    filterPopulationByKind();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [population, selectedPrefCodes, kind]);

  const options = ["総人口", "生産年齢人口", "老年人口", "年少人口"] as const satisfies PopulationKind[];

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const kind = event.target.value as PopulationKind;
    setKind(kind);
  };

  const isEmpty = populationData.length === 0 && selectedPrefCodes.size === 0;
  const isFetching = populationData.length === 0 && selectedPrefCodes.size > 0;

  return <>
    <section>
      <Title>グラフ</Title>
      <RadioGroup options={options} value={kind} onChange={handleRadioChange} />

      {isEmpty && <p className="message-box">グラフを表示するには都道府県を選択してください。</p>}
      {isFetching && <p className="message-box">人口構成データの取得中...</p>}

      {!isEmpty && !isFetching
        && <Chart
          data={populationData}
          xAxisLabel="年"
          yAxisLabel={`${kind} (人)`}
          xAxisDataKey="year"
          yAxisDataKey="value"
        />
      }
    </section>
  </>;
}
