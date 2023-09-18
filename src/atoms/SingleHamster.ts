import { atom, RecoilState } from 'recoil'
import { Hamster } from '../models/Hamster'

const hamsterAtom: RecoilState<Hamster> = atom({
  key: 'eggs', // any unique string
  default:
    { id: 'feiyuhg53487er587', name: 'Derek', age: 5, loves: 'basketball', favFood: 'carrots', imgName: 'hamster-12.jpg', games: 0, wins: 0, defeats: 0 }

})

export default hamsterAtom
