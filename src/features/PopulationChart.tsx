import { useEffect, useState } from "react";

import PopulationChart from "@/components/LineChart";
import RadioGroup from "@/components/RadioGroup";
import { useFetchedPopulation, useSelectedPrefCodes } from "@/hooks/usePopulation";
import { PopulationKind } from "@/models/APIResponseType";
import { PopulationElement } from "@/models/ChartElements";


export default function Chart() {
  const { population } = useFetchedPopulation();
  const { selectedPrefCodes } = useSelectedPrefCodes();

  const [kind, setKind] = useState<PopulationKind>("総人口");
  const [populationData, setPopulationData] = useState<PopulationElement[]>([]);

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

  return <>
    <section>
      <RadioGroup options={options} value={kind} onChange={handleRadioChange} />
      {populationData.length === 0
        && <p>グラフを表示するには都道府県を選択してください。</p>
        || <PopulationChart
          data={populationData}
          xAxisLabel="年"
          yAxisLabel={kind}
          xAxisDataKey="year"
          yAxisDataKey="value"
        />
      }
    </section>
  </>;
}
