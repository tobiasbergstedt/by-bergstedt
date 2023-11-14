import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SEOHelmet from '@components/SEOHelmet/SEOHelmet';

import CuttingBoard from './CuttingBoard/CuttingBoard';

const Custom = (): JSX.Element => {
  const [dimensions, setDimensions] = useState({
    width: 1,
    height: 2,
    depth: 0.1,
  });

  const [edgeStyle, setEdgeStyle] = useState('beveled');

  const [handleIndent, setHandleIndent] = useState(0);

  const onDimensionChange = (event: any): void => {
    setDimensions({
      ...dimensions,
      [event.target.name]: event.target.value,
    });
  };

  const onEdgeStyleChange = (event: any): void => {
    setEdgeStyle(event.target.value);
  };

  const onHandleIndentChange = (event: any): void => {
    setHandleIndent(event.target.value);
  };

  const { t } = useTranslation();

  return (
    <>
      <div
        style={{
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SEOHelmet
          title={t('helmet.custom.title')}
          description={t('helmet.custom.description')}
        />
        <div style={{ display: 'flex' }}>
          <form>
            <input
              type="number"
              name="width"
              placeholder="Width"
              value={dimensions.width}
              onChange={onDimensionChange}
            />
            <input
              type="number"
              name="height"
              placeholder="Height"
              value={dimensions.height}
              onChange={onDimensionChange}
            />
            <input
              type="number"
              name="depth"
              placeholder="Depth"
              value={dimensions.depth}
              onChange={onDimensionChange}
            />

            <select
              name="edgeStyle"
              value={edgeStyle}
              onChange={onEdgeStyleChange}
            >
              <option value="beveled">Beveled</option>
              <option value="rounded">Rounded</option>
            </select>

            <input
              type="number"
              name="handleIndent"
              placeholder="Handle Indent"
              value={handleIndent}
              onChange={onHandleIndentChange}
            />

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Submit
            </button>
          </form>
        </div>
        <CuttingBoard
          dimensions={dimensions}
          // edges={{ type: 'beveled', size: 5 }}
          // materials={['oak']}
          // handles={true}
        />
      </div>
    </>
  );
};

export default Custom;
