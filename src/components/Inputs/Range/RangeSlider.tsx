import { Range, getTrackBackground } from 'react-range';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { type Filter } from '@interfaces/interfaces';
import formatPrice from '@utils/format-price';

import styles from './RangeSlider.module.scss';

interface PropTypes {
  min?: number;
  max?: number;
  values: number[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const RangeSlider = ({
  min = 0,
  max = 10000,
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
                    min: MIN,
                    max: MAX,
                  }),
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
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
        {formatPrice(values[0])} - {formatPrice(values[1])}{' '}
        {t('misc.currencies.sek')}
      </output>
    </div>
  );
};

export default RangeSlider;
