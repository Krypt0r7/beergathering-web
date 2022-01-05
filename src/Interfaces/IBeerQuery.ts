export interface IBeerQuery {
  beer: IBeers;
}

export interface IBeers {
  beersQuery: IBeer[];
}

interface IBeerContainer {
  type: string;
  volume: number;
  price: number;
  systemetNumber: number;
}

interface IBeer {
  id: string;
  name: string;
  type: string;
  alcohol: number;
  likes: number;
  containers: IBeerContainer[];
  breweryId: string;
}
