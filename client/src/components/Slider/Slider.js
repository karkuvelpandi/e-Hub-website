import React, { cloneElement, useState, useEffect } from "react";

export const Slider = ({
  children,
  sliderClass = "",
  dotClass = "",
  dotColor = "",
  dotContainerClass = "",
  dots = false,
  arrow = false,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % children.length);
    }, 3000);
    console.log("test");

    return () => {
      clearInterval(interval);
    };
  }, [activeTab]);

  const handleScrollLeft = () => {
    if (activeTab === 0) {
      setActiveTab(children.length - 1);
    } else setActiveTab((prevTab) => prevTab - 1);
  };

  const handleScrollRight = () => {
    setActiveTab((prevTab) => (prevTab + 1) % children.length);
  };

  if (!children) return null;
  return (
    <>
      <div className="w-full h-auto">
        {children.map((child, index) => {
          return <div key={index}>{index === activeTab ? child : null}</div>;
        })}
      </div>
      {arrow && (
        <div>
          <button
            className="rounded-full w-8 h-8 absolute left-2 sm:left-5 top-28 sm:top-32 z-20 hover:bg-blue-300 active:bg-blue-500 border-white text-white border-2 active:translate-y-1"
            onClick={handleScrollLeft}
          >
            &#129032;
          </button>

          <button
            className="rounded-full w-8 h-8 absolute right-2 sm:right-5 sm:top-32 top-28 z-20 hover:bg-blue-300 active:bg-blue-500  border-white text-white border-2 active:translate-y-1"
            onClick={handleScrollRight}
          >
            &#129034;
          </button>
        </div>
      )}
      <div />
      <div className={dotContainerClass}>
        {[...Array(children.length)].map((a, i) => {
          return (
            <p
              key={i}
              style={
                dots && activeTab === i
                  ? { backgroundColor: dotColor || "black" }
                  : { backgroundColor: "white" }
              }
              className={`${
                dots
                  ? activeTab === i
                    ? "w-5 h-2 rounded-full transition-all duration-500"
                    : "w-3 h-2 rounded-full transition-all duration-500"
                  : ""
              }`}
              onClick={() => setActiveTab(i)}
            >
              {!dots && i + 1}
            </p>
          );
        })}
      </div>
    </>
  );
};

// usage
{
  /* <Slider>
            {array.map((tab) => (
              <div className="h-full w-36 bg-slate-400">
                <p>{tab.title}</p>
                <p>{tab.instruction}</p>
              </div>
            ))}
          </Slider> */
}
