export type ResasAPIResponse<T> = {
  message: string | null;
  result: T[];
};

export type ResasPrefecture = {
  prefCode: number;
  prefName: string;
};
