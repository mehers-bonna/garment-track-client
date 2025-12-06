import { FadeLoader } from 'react-spinners';

const LoadingSpinner = ({ smallHeight = false, color = '#442C2E' }) => {
  return (
    <div
      className={`flex justify-center items-center w-full ${
        smallHeight ? 'h-[250px]' : 'h-[70vh]'
      }`}
    >
      <FadeLoader size={100} color={color} />
    </div>
  );
};

export default LoadingSpinner;
