export type PopulationElement = {
  prefName: string;
  prefCode: number;
  data: {
    label: string,
    data: {
      year: number;
      value: number;
      rate?: number;  // 総人口の場合、rateは存在しない
    }[]
  }[]
}
