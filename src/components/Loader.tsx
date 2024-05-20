import { TailSpin } from "react-loader-spinner";

interface Props {
  hight: string;
}

function Loader(props: Props) {
  const {} = props;

  return (
    <>
      <div
        className={`bg-transparent h-[${props.hight}] w-full flex justify-center items-center`}
      >
        <TailSpin
          visible={true}
          height="40"
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
