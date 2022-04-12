export interface IBeersQueryModel {
  beer: IBeersQuery
}

export interface IBeerQueryModel {
  beer: IBeerQuery
}

export interface IBeersQuery {
  beersQuery: IBeer[]
}

export interface IBeerQuery {
  beerQuery: IBeer
}

interface IBeerContainer {
  type: string
  volume: number
  price: number
  systemetNumber: number
}

interface IBeer {
  id: string
  name: string
  type: string
  city: string
  country: string
  alcohol: number
  likes: number
  containers: IBeerContainer[]
  breweryId: string
  imageUrl: string
}
