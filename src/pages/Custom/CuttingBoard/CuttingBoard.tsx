interface BoardProps {
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

const CuttingBoard = ({ dimensions }: BoardProps): JSX.Element => {
  return <div>Cutting Board Configurator</div>;
};

export default CuttingBoard;
