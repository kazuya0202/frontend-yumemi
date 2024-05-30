export type ResasAPIResponseList<T> = {
  message: string | null;
  result: T[];
};

export type ResasAPIResponse<T> = {
  message: string | null;
  result: T;
}

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

export type PopulationKind = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";
