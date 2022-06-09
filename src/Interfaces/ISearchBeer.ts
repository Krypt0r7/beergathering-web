export interface IBeerQuery {
  beer: IBeer
}

interface IBeer {
  searchBeersQuery: IItems[]
}

interface IItems {
  id: string
  name: string
  alcohol: number
  breweryName: string
}
