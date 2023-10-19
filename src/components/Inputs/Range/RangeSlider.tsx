import { Range, getTrackBackground } from 'react-range';
import clsx from 'clsx';

import { useTranslation } from 'react-i18next';

import styles from './RangeSlider.module.scss';
import { type Filter } from '@interfaces/interfaces';

interface PropTypes {
  min?: number;
  max?: number;
  values: number[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const RangeSlider = ({
  min,
  max,
  values,
  filter,
  setFilter,
}: PropTypes): JSX.Element => {
  const STEP = 10;
  const MIN = min;
  const MAX = max;

  const { t } = useTranslation();

  return (
    <div className={styles.rangeContainer}>
      <div className={styles.rangeSlider}>
        <Range
          allowOverlap
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => {
            setFilter({ ...filter, rangeValues: values });
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
              }}
              className={styles.rangeWrapper}
            >
              <div
                ref={props.ref}
                className={styles.rangeTrack}
                style={{
                  background: getTrackBackground({
                    values,
                    colors: [
                      'var(--color-white)',
                      'var(--color-brown-1)',
                      'var(--color-white)',
                    ],
                    min: MIN ?? 0,
                    max: MAX ?? 10000,
                  }),
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
              }}
              className={styles.thumb}
            >
              <div
                className={clsx(styles.thumbMarker, {
                  [styles.thumbIsDragged]: isDragged,
                })}
              />
            </div>
          )}
        />
      </div>
      <output className={styles.valuesOutput} id="output">
        {values[0]} - {values[1]} {t('misc.currencies.sek')}
      </output>
    </div>
  );
};

export default RangeSlider;
