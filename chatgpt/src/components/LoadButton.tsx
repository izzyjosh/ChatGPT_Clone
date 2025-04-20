import Loader from "./icons/Loader";

type ButtonProps = {
  name: string;
  loading: boolean;
  handleClick: () => {};
};

const LoadButton = ({ name, loading, handleClick }: ButtonProps) => {
  return (
    <button
      className="w-full py-2 px-4 bg-black hover:bg-prdark text-white font-semibold rounded-md shadow disabled:bg-lgaccent disabled:text-white"
      disabled={loading}
      onClick={handleClick}
    >
      {!loading ? name : <Loader />}
    </button>
  );
};
export default LoadButton;
