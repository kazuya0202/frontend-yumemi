export type ResasAPIResponse<T> = {
  message: string | null;
  result: T[];
};

export type ResasPrefecture = {
  prefCode: number;
  prefName: string;
};

export type ResasPopulation = {
  boundaryYear: number;
  data: {
    label: string;
    data: {
      year: number;
      value: number;
      rate?: number;  // 総人口の場合、rateは存在しない
    }[]
  }[]
}
