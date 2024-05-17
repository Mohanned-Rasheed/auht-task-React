import React from "react";

interface Props {}

function Home(props: Props) {
  const {} = props;

  return (
    <>
      <div className="h-screen bg-gray-200">
        {
          //Header
        }
        <div className="h-[5rem] bg-gray-300 flex justify-around items-center">
          <div className="font-bold text-2xl">Auth Task</div>
          <div className="font-bold cursor-pointer">Home</div>
          <div className="mr-6">
            {true ? (
              <button className="font-bold border border-black rounded-lg p-2 cursor-pointer hover:opacity-60">
                Logout
              </button>
            ) : (
              <div className="flex gap-4">
                <button className="font-bold border border-black rounded-lg p-2 cursor-pointer hover:opacity-60">
                  Login
                </button>
                <button className="font-bold border border-black rounded-lg p-2 cursor-pointer hover:opacity-60">
                  Sgin Up
                </button>
              </div>
            )}
          </div>
        </div>
        {
          ////
        }
        {
          // Verfication Message
        }
        {true && (
          <div className="mt-16 max-w-7xl m-auto bg-gray-300 rounded-md pl-2 py-2 flex justify-center text-red-600">
            !Your Account Has'nt verified Yet{" "}
            <button className="pl-1 cursor-pointer underline hover:opacity-80">
              Resend verification
            </button>
          </div>
        )}
        {
          ////
        }

        <div
          className={`max-w-7xl m-auto h-[30rem] mt-4 rounded-lg flex justify-center bg-gray-300`}
        >
          <div>Hi Mohanned</div>
        </div>
      </div>
    </>
  );
}

export default Home;
