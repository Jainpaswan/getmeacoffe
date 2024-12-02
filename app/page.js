import Image from "next/image";

export default function Home() {
  return (
   <>
   <div className="flex flex-col items-center justify-center h-[44vh] ">
    <div className="flex justify-center items-center text-3xl font-bold gap-2">
      <span className="text-5xl text-orange-600 invert  sm:flex-shrink">Buy Me A Coffee</span>
      <span className="flex-grow"><img className="invert" src="logo.png" alt="banner" width={80} />
      </span>
    </div>
    <p className="mt-2 font-mono">A crowd funding website.Get funded by your fans and followers.</p>
    <div className="flex gap-2 flex-wrap">
    <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now</button>
    <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more</button>
    </div>
   </div>
   <div className="border-b-2 border-blue-500 gap-2"></div>
   <div className="text-white container mx-auto pb-32 pt-14 gap-2 ">
    <h2 className="text-3xl font-bold font-sans text-center mb-12">My Activities</h2>
    <div className="flex gap-5 justify-around" >
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full p-2"
              width={100}
              src="/work.png"
              alt=""
            />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">
              Your fans are availabe to you help you
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full p-2"
              width={100}
              src="/coin.png"
              alt=""
            />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">
              Your fans are availabe to you help you
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full p-2"
              width={100}
              src="/group.png"
              alt=""
            />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">
              Your fans are availabe to you help you
            </p>
          </div>
        </div>
   </div>
   <div className="border-b-2 border-blue-500 gap-2"></div>
   <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">
          Your fans buy you a Chai
        </h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/bhytMIn3EbA?si=qj_2cFNxTzslK84H"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
   </>
  );
}
