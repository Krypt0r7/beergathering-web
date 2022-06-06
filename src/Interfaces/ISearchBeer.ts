export interface IBeerQuery {
  beer: IBeer
}

interface IBeer {
  searchBeerQuery: IItems[]
}

interface IItems {
  id: string
  name: string
  alcohol: number
  breweryName: string
}
