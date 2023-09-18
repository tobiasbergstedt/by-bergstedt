import styles from './Start.module.scss';
import { useTranslation } from 'react-i18next';

// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// import { fixUrl } from '../../utils'
// import { Hamster } from '../../models/Hamster'

const Start = (): JSX.Element => {
  const { t } = useTranslation();
  // const [hamsterData, setHamsterData] = useState<Hamster[] | null>(null)

  // useEffect(() => {
  //   async function getData() {
  //     const response: Response = await fetch(fixUrl('/hamsters/cutest'))
  //     const apiData: any = await response.json()
  //     setHamsterData(apiData as Hamster[])
  //   }
  //   getData()
  // },[])

  // let winWidth: number = 0
  // let loseWidth: number = 0
  // let winsDifference: number = 0
  // if (hamsterData !== null) {
  //   winWidth = (Math.round((hamsterData[0].wins/hamsterData[0].games)*100))
  //   loseWidth = (Math.round((hamsterData[0].defeats/hamsterData[0].games)*100))
  //   winsDifference = hamsterData[0].wins - hamsterData[0].defeats
  // }

  return (
    <section className={styles.start}>
      <div className={styles.startInfo}>
        <h1>
          <span>Welcome to</span>{' '}
          <span>
            <b>the Hamster Wars</b>
          </span>
        </h1>
        <p>
          Your number 1 go-to place when it comes to hamsters, hamster battles
          and all things cute. This website is dedicated to finding the cutest
          hamster of them all. And to do that, we're going to need <b>YOUR</b>{' '}
          help.{' '}
        </p>
        <p>{t('line3')}</p>
      </div>

      {/* <div className="info-box">
        <h3>How it all works:</h3>
        <p>
          You can upload new hamsters to the database, as well as remove
          existing ones. Navigate to the 'Gallery' tab to do this.
        </p>
        <p>
          You can battle hamsters under the 'Battle' tab. This is how the cutest
          hamster is chosen. You will get the images of two hamsters, of which
          you will have to choose the cutest one. This result will then be sent
          to our server, and the statistics updated accordingly.
        </p>
        <p>
          These statistics are then used to calculate the cutest hamster of them
          all, i.e. the one with the highest win difference (wins - losses). The
          winner is the one displayed, in all His/Her glory, above.
        </p>
      </div> */}
    </section>
  );
};

export default Start;
