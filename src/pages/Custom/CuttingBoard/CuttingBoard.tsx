import {
  // RenderTexture,
  // PerspectiveCamera,
  RoundedBox,
  RenderCubeTexture,
} from '@react-three/drei';

import { type CuttingBoardProps } from '@interfaces/interfaces';
import { RepeatWrapping, TextureLoader } from 'three';
import fixUrl from '@utils/fix-url';

// import styles from './CuttingBoard.module.scss';

const CuttingBoard = ({
  cuttingBoardConfiguration,
  pattern,
}: {
  cuttingBoardConfiguration: CuttingBoardProps;
  pattern: any;
}): JSX.Element => {
  // console.log(pattern.attributes.texture.data.attributes.url);

  const texture = new TextureLoader().load(
    fixUrl(pattern.attributes.texture.data.attributes.url),
  );

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(
    Number(cuttingBoardConfiguration.width) / 100,
    Number(cuttingBoardConfiguration.depth) / 100,
  );

  const key = `${cuttingBoardConfiguration.edgeStyle}${cuttingBoardConfiguration.edgeSize}`;

  const edgeSize = Number(cuttingBoardConfiguration.edgeSize);
  const height = Number(cuttingBoardConfiguration.height);

  const isValidEdgeSize = !isNaN(edgeSize);
  const isValidHeight = !isNaN(height) && height !== 0;

  return (
    <RoundedBox
      key={key}
      args={[
        !isNaN(Number(cuttingBoardConfiguration.width)) &&
        Number(cuttingBoardConfiguration.width) !== 0
          ? Number(cuttingBoardConfiguration.width) / 100
          : 4.5,
        !isNaN(Number(cuttingBoardConfiguration.height)) &&
        Number(cuttingBoardConfiguration.height) !== 0
          ? Number(cuttingBoardConfiguration.height) / 100
          : 0.35,
        !isNaN(Number(cuttingBoardConfiguration.depth)) &&
        Number(cuttingBoardConfiguration.depth) !== 0
          ? Number(cuttingBoardConfiguration.depth) / 100
          : 3,
      ]}
      radius={
        isValidEdgeSize && edgeSize >= height / 2 && isValidHeight
          ? height / 200
          : edgeSize < height / 2
          ? edgeSize / 100
          : 0.05
      }
      bevelSegments={
        cuttingBoardConfiguration.edgeStyle === 'rounded' ? 4 : 0.5
      }
      smoothness={cuttingBoardConfiguration.edgeStyle === 'rounded' ? 4 : 0.5}
      // scale={[1, 1, 1]}
    >
      <meshStandardMaterial>
        <RenderCubeTexture attach="map" anisotropy={1} flip>
          {/* <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0, 0, 5]}
          /> */}
          <primitive attach="background" object={texture} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
        </RenderCubeTexture>
      </meshStandardMaterial>
    </RoundedBox>
  );
};

export default CuttingBoard;
