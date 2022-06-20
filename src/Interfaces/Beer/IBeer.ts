import { IContainer } from './IContainer'

export interface IBeer {
  liked: boolean
  id: string
  name: string
  type: string
  city: string
  country: string
  alcohol: number
  likes: number
  containers: IContainer[]
  breweryId: string
  breweryName: string
  imageUrl: string
  hasBeenDrunk: boolean
}
