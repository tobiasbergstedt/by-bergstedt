import { atom, RecoilState } from 'recoil'
import { Hamster } from '../models/Hamster'

const allHamstersAtom: RecoilState<Hamster[]> = atom({
  key: 'bacon', // any unique string
  default: [
    { id: 'jy46asd456btyi4o', name: 'Derek', age: 5, loves: 'basketball', favFood: 'carrots', imgName: 'hamster-12.jpg', games: 0, wins: 0, defeats: 0 }
  ]
})

export default allHamstersAtom
