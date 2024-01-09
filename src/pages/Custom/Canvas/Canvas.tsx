import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

import { type CuttingBoardProps } from '@interfaces/interfaces';

import styles from './Canvas.module.scss';
import CuttingBoard from '@pages/Custom/CuttingBoard/CuttingBoard';

const CustomCanvas = ({
  cuttingBoardConfiguration,
  pattern,
}: {
  cuttingBoardConfiguration: CuttingBoardProps;
  pattern: any;
}): JSX.Element => {
  return (
    <Canvas className={styles.canvas} camera={{ position: [5, 5, 8], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <CuttingBoard
        cuttingBoardConfiguration={cuttingBoardConfiguration}
        pattern={pattern}
      />
      <ContactShadows
        frames={1}
        position={[0, -0.5, 0]}
        blur={1}
        opacity={0.75}
      />
      <OrbitControls minPolarAngle={0} maxPolarAngle={180} />
    </Canvas>
  );
};

export default CustomCanvas;
