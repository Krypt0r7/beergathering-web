import { IBeer } from './IBeer'
import { IBeerTypes } from './IBeerTypes'
import { IBrewery } from './IBrewery'

export interface IBeersQueries {
  beers: IBeer[]
  beer: IBeer
  searchBeers: IBeer[]
  hops: string[]
  beerTypes: IBeerTypes[]
  breweries: IBrewery[]
}
