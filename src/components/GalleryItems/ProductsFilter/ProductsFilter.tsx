import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  type Filter,
  type Category,
  type Product,
} from '@interfaces/interfaces';

import RangeSlider from '@components/Inputs/Range/RangeSlider';
import Select from '@components/Inputs/Select/Select';
import Button from '@components/Button/Button';

import styles from './ProductsFilter.module.scss';

interface PassedProps {
  categories: Category[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  products: Product[];
}

const ProductsFilter = ({
  categories,
  filter,
  setFilter,
  products,
}: PassedProps): JSX.Element => {
  const [minMaxRange, setMinMaxRange] = useState<number[]>([0, 10000]);

  const { t } = useTranslation();

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const prices = products.map((product) => product.attributes.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setMinMaxRange([minPrice, maxPrice]);
    setFilter({ ...filter, rangeValues: [minPrice, maxPrice] });
  }, [products]);

  return (
    <div className={styles.filterContainer}>
      <Select
        all={t('misc.all')}
        label={t('gallery.category')}
        options={categories.map(({ attributes }) => ({
          value: attributes.slug,
          label: attributes.name,
        }))}
        onChange={(selectedValue) => {
          setFilter({ ...filter, category: selectedValue });
        }}
        ref={selectRef}
      />
      <div className={styles.priceRangeContainer}>
        {/* <p>Pris:</p> */}
        <RangeSlider
          min={minMaxRange[0]}
          max={minMaxRange[1]}
          values={filter.rangeValues}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <Button
        isTertiary
        onClick={() => {
          setFilter({ category: null, rangeValues: minMaxRange });
          if (selectRef?.current != null) {
            selectRef.current.value = 'default';
          }
        }}
      >
        {t('gallery.reset')}
      </Button>
    </div>
  );
};

export default ProductsFilter;
