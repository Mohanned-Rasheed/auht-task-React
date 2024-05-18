import { TailSpin } from "react-loader-spinner";

interface Props {}

function Loader(props: Props) {
  const {} = props;

  return (
    <>
      <div className="bg-slate-300 h-[100vh] w-full flex justify-center items-center">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}

export default Loader;
