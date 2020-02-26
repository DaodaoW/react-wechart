import React from 'react';
import { message } from 'antd';
import { Main } from './styled';
import { TipItems } from './tipItems';

import logo from '@/assets/bindAccount/logo.png';
import pm from '@/assets/bindAccount/pm.png';
import pos from '@/assets/bindAccount/pos.png';
import sd from '@/assets/bindAccount/sd.png';
import space from '@/assets/bindAccount/space.png';
import wd from '@/assets/bindAccount/wd.png';
import weather from '@/assets/bindAccount/weather.png';
import styles from './index.css';

interface MainBodyProps {
  children: React.ReactChild,
  data: any
}

export const MainBody: React.FC<MainBodyProps> = (props) => {
  return (
    <>
      <Main>
        <img className={styles.logo} src={logo} alt='logo.png' />
        {
          props.data ?
          <>
            <div className={styles.onLine}>
              <TipItems img={pos} tips={props.data.region || ''} />
              <TipItems img={weather} tips={props.data.weather || ''} />
            </div>
            <div className={styles.onLine}>
              <TipItems img={space} tips='室外' />
              <TipItems img={wd} tips={props.data.temperature  || ''} />
              <TipItems img={sd} tips={props.data.humidity  || ''} />
              <TipItems img={pm} tips={props.data.pm  || ''} />
            </div>
          </> : null
        }
        <div className={styles.blockpage}>
          {props.children}
        </div>
      </Main>
    </>
  )
}