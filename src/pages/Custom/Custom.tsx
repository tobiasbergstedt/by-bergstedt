import {
  useRef,
  useState,
  type ChangeEvent,
  type MutableRefObject,
  Fragment,
  useEffect,
  useContext,
} from 'react';
import { useTranslation } from 'react-i18next';

import { fetchData } from '@utils/api';
import { UserContext } from '@context/UserContext';

import SEOHelmet from '@components/SEOHelmet/SEOHelmet';
import Select from '@components/Inputs/Select/Select';
import Input from '@components/Inputs/Input/Input';
import CustomCanvas from '@pages/Custom/Canvas/Canvas';

import styles from './Custom.module.scss';
import Loading from '@components/Spinner/Loading/Loading';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import {
  type Texture,
  type CuttingBoardProps,
  type Material,
  type InputProps,
} from '@interfaces/interfaces';

interface ConfigRefsProps {
  edgeStyle: MutableRefObject<null>;
  edgeSize: MutableRefObject<null>;
  width: MutableRefObject<null>;
  depth: MutableRefObject<null>;
  height: MutableRefObject<null>;
  handleIndent: MutableRefObject<null>;
  pattern: MutableRefObject<null>;
  materials1: MutableRefObject<null>;
  materials2: MutableRefObject<null>;
  materials3: MutableRefObject<null>;
  materials4: MutableRefObject<null>;
  materials5: MutableRefObject<null>;
}

interface Pattern {
  attributes: {
    name: string;
    slug: string;
    texture: Texture;
    materials: {
      data: Material[];
    };
  };
}

const Custom = (): JSX.Element => {
  const { t } = useTranslation();
  const { locale } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string>('');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  // const [inputDimensions, setInputDimensions] = useState({
  //   width: null,
  //   depth: null,
  //   height: null,
  // });
  const [cuttingBoardConfiguration, setCuttingBoardConfiguration] =
    useState<CuttingBoardProps>({
      width: null,
      depth: null,
      height: null,
      edgeStyle: t('custom.beveledInternal'),
      edgeSize: null,
      handleIndent: 0,
      pattern: 'chess',
      materials: [
        {
          attributes: { slug: 'oak', name: 'Oak' },
        },
        {
          attributes: { slug: 'walnut', name: 'Walnut' },
        },
        {
          attributes: { slug: 'cherry', name: 'Cherry' },
        },
        {
          attributes: { slug: 'ash', name: 'Ash' },
        },
        {
          attributes: { slug: 'maple', name: 'Maple' },
        },
      ],
    });
  const [chosenPattern, setChosenPattern] = useState<Pattern | undefined>({
    attributes: {
      name: 'Chess',
      slug: 'chess',
      texture: {
        data: {
          id: 1,
          attributes: {
            formats: {
              thumbnail: {
                url: '',
                width: 0,
                height: 0,
              },
              small: {
                url: '',
                width: 0,
                height: 0,
              },
              medium: {
                url: '',
                width: 0,
                height: 0,
              },
              large: {
                url: '',
                width: 0,
                height: 0,
              },
            },
            url: '/uploads/20220221_162247_580x_6384b972d0.jpg',
          },
        },
      },
      materials: {
        data: [
          {
            attributes: {
              name: 'Walnut',
              slug: 'walnut',
            },
          },
        ],
      },
    },
  });

  const edgeStyles = [
    { value: t('custom.beveledInternal'), name: t('custom.beveled') },
    { value: t('custom.roundedInternal'), name: t('custom.rounded') },
  ];

  // useEffect(() => {
  //   console.log(chosenPattern?.attributes.materials);
  //   console.log(cuttingBoardConfiguration.materials);

  //   // if (chosenPattern !== undefined) {
  //   //   setCuttingBoardConfiguration({
  //   //     ...cuttingBoardConfiguration,
  //   //     materials: chosenPattern.attributes.materials,
  //   //   });
  //   // }
  // }, [chosenPattern]);

  // console.log(chosenPattern?.attributes.materials.data);

  useEffect(() => {
    void fetchData(
      [
        {
          url: `/api/materials?locale=${locale}`,
          setData: setMaterials,
          errorMessage: t('misc.apiErrors.materials'),
        },
        {
          url: `/api/patterns?populate=*&locale=${locale}`,
          setData: setPatterns,
          errorMessage: t('misc.apiErrors.patterns'),
        },
      ],
      setIsLoading,
      setApiError,
    );
  }, [locale]);

  // useEffect(() => {
  //   const pattern = patterns.find(
  //     (pattern) =>
  //       pattern.attributes.slug === cuttingBoardConfiguration.pattern,
  //   );
  //   setChosenPattern(pattern);
  // }, [cuttingBoardConfiguration.pattern]);

  const configRefs: ConfigRefsProps = {
    edgeStyle: useRef(null),
    edgeSize: useRef(null),
    width: useRef(null),
    depth: useRef(null),
    height: useRef(null),
    handleIndent: useRef(null),
    pattern: useRef(null),
    materials1: useRef(null),
    materials2: useRef(null),
    materials3: useRef(null),
    materials4: useRef(null),
    materials5: useRef(null),
  };

  // const onDimensionChange = (event: any): void => {
  //   setCuttingBoardConfiguration({
  //     ...cuttingBoardConfiguration,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const handleInputChange =
    (propertyName: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.valueAsNumber;

      setCuttingBoardConfiguration((prevConfig) => ({
        ...prevConfig,
        [propertyName]: !isNaN(newValue) && newValue >= 0 ? newValue : null,
      }));
    };

  const dimensionsInputs = [
    {
      inputRef: configRefs.width,
      inputValue: cuttingBoardConfiguration.width,
      propertyName: 'width',
      placeholder: 'Width (mm)',
    },
    {
      inputRef: configRefs.depth,
      inputValue: cuttingBoardConfiguration.depth,
      propertyName: 'depth',
      placeholder: 'Depth (mm)',
    },
    {
      inputRef: configRefs.height,
      inputValue: cuttingBoardConfiguration.height,
      propertyName: 'height',
      placeholder: 'Height (mm)',
    },
  ];

  const handleOptions = [
    {
      value: 1,
      label: t('misc.yes'),
    },
    {
      value: 0,
      label: t('misc.no'),
    },
  ];

  // const chosenPattern = (): Pattern | undefined => {
  //   const pattern = patterns.find(
  //     (pattern) =>
  //       pattern.attributes.slug === cuttingBoardConfiguration.pattern,
  //   );
  //   return pattern;
  // };

  const RenderMaterialSelect: (index: any) => JSX.Element | null = (index) => {
    const material = cuttingBoardConfiguration.materials[index]?.attributes;

    if (material === undefined || material === null) {
      // Handle the case where material is undefined
      return null; // or return an appropriate default value
    }
    return (
      <Select
        key={index}
        defaultValue={material.slug}
        label={material.name}
        options={materials.map(({ attributes }) => ({
          value: attributes.slug,
          label: attributes.name,
        }))}
        onChange={(selectedValue) => {
          setCuttingBoardConfiguration((prevConfig) => {
            const newMaterials = [...prevConfig.materials];
            const matchingMaterial = materials.find(
              (material) => material.attributes.slug === selectedValue,
            );

            if (matchingMaterial !== null && matchingMaterial !== undefined) {
              newMaterials[index].attributes.slug =
                matchingMaterial.attributes.slug;
              newMaterials[index].attributes.name =
                matchingMaterial.attributes.name;
            } else {
              newMaterials[index].attributes.slug = selectedValue;
              newMaterials[index].attributes.name =
                selectedValue.slice(0, 1).toUpperCase() +
                selectedValue.slice(1);
            }

            return {
              ...prevConfig,
              materials: newMaterials,
            };
          });
        }}
        ref={configRefs[`materials${index + 1}` as keyof ConfigRefsProps]}
      />
    );
  };

  const RenderPatternAndMAterials: () => JSX.Element = () => {
    const numSelects = 5; // Change this based on the number of Selects you want

    return (
      <Fragment>
        <div className={styles.materialsContainer}>
          <p>{t('custom.material')}:</p>
          {/* <div className={styles.materialsContainer}> */}
          {Array.from({ length: numSelects }, (_, index) => (
            <Fragment key={index}>{RenderMaterialSelect(index)}</Fragment>
          ))}
          {/* </div> */}
        </div>
      </Fragment>
    );
  };

  return (
    <>
      <div className={styles.customContainer}>
        <SEOHelmet
          title={t('helmet.custom.title')}
          description={t('helmet.custom.description')}
        />
        {isLoading ? (
          <Loading />
        ) : apiError.length !== 0 ? (
          <ErrorMessage
            identifier={t('misc.apiErrors.errorHeading')}
            errorMessage={apiError}
          />
        ) : (
          <>
            <div className={styles.patternContainer}>
              <p>{t('custom.pattern')}:</p>
              <Select
                defaultValue={cuttingBoardConfiguration.pattern}
                label={t('custom.pattern')}
                options={patterns.map(({ attributes }) => ({
                  value: attributes.slug,
                  label: attributes.name,
                }))}
                onChange={(selectedValue) => {
                  const pattern = patterns.find(
                    (pattern) => pattern.attributes.slug === selectedValue,
                  );
                  setChosenPattern(pattern);

                  console.log(pattern?.attributes.materials.data);
                  console.log(cuttingBoardConfiguration.materials);

                  if (pattern !== undefined) {
                    setCuttingBoardConfiguration({
                      ...cuttingBoardConfiguration,
                      pattern: selectedValue,
                      materials:
                        pattern?.attributes.materials.data ??
                        cuttingBoardConfiguration.materials,
                    });
                  } else {
                    setCuttingBoardConfiguration({
                      ...cuttingBoardConfiguration,
                      pattern: selectedValue,
                    });
                  }
                }}
                ref={configRefs.pattern}
              />
              <p>{t('custom.handle')}:</p>
              <Select
                defaultValue={cuttingBoardConfiguration.handleIndent}
                label={t('custom.handle')}
                options={handleOptions}
                onChange={(selectedValue) => {
                  setCuttingBoardConfiguration({
                    ...cuttingBoardConfiguration,
                    handleIndent: Number(selectedValue),
                  });
                }}
                ref={configRefs.handleIndent}
              />
            </div>
            {RenderPatternAndMAterials()}
          </>
        )}
        <div className={styles.dimensionsContainer}>
          <p>{t('custom.dimensions')}:</p>
          {dimensionsInputs.map(
            (
              { inputRef, inputValue, propertyName, placeholder }: InputProps,
              index: number,
            ) => (
              <Input
                type="number"
                ref={inputRef}
                inputValue={inputValue}
                // onChange={handleInputChange}
                onChange={handleInputChange(propertyName)}
                placeholder={placeholder}
                key={index}
              />
            ),
          )}
        </div>
        <div className={styles.edgeContainer}>
          <p>{t('custom.edges')}:</p>
          <Select
            defaultValue={cuttingBoardConfiguration.edgeStyle}
            label={t('custom.beveled')}
            options={edgeStyles.map(({ value, name }) => ({
              value,
              label: name,
            }))}
            onChange={(selectedValue) => {
              setCuttingBoardConfiguration({
                ...cuttingBoardConfiguration,
                edgeStyle: selectedValue,
              });
            }}
            ref={configRefs.edgeStyle}
          />
          <Input
            type="number"
            ref={configRefs.edgeSize}
            inputValue={cuttingBoardConfiguration.edgeSize}
            onChange={(selectedValue) => {
              setCuttingBoardConfiguration({
                ...cuttingBoardConfiguration,
                edgeSize:
                  !Number.isNaN(Number(selectedValue.target.valueAsNumber)) &&
                  Number(selectedValue.target.valueAsNumber) >= 0
                    ? selectedValue.target.valueAsNumber
                    : '',
              });
            }}
            placeholder={t('custom.edgeSize')}
          />
          <p style={{ fontSize: '14px' }}>(Specify dimensions first.)</p>
        </div>

        <CustomCanvas
          cuttingBoardConfiguration={cuttingBoardConfiguration}
          pattern={chosenPattern}
          // edges={{ type: 'beveled', size: 5 }}
          // materials={['oak']}
          // handles={true}
        />

        <div className={styles.data}>
          <p>Edge style: {cuttingBoardConfiguration.edgeStyle}</p>
          <p>Edge size: {cuttingBoardConfiguration.edgeSize}</p>
          <p>Width: {cuttingBoardConfiguration.width}</p>
          <p>Depth: {cuttingBoardConfiguration.depth}</p>
          <p>Height: {cuttingBoardConfiguration.height}</p>
          <p>
            Handle Indentation:{' '}
            {cuttingBoardConfiguration.handleIndent === 1
              ? t('misc.yes')
              : t('misc.no')}
          </p>
          <p>Pattern: {cuttingBoardConfiguration.pattern}</p>
          <p>
            Materials:{' '}
            {cuttingBoardConfiguration.materials.map(({ attributes }) => {
              return attributes.name;
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default Custom;
