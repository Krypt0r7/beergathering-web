import { IBeersQueries } from './Beer/IBeerQueries'
import { IListQueries } from './List/IListQueries'

export interface IQuery {
  beer: IBeersQueries
  list: IListQueries
}
