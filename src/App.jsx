import { useState, useRef, useLayoutEffect, useReducer } from "react";

import "./App.css";






function App() {
  const items = [
    "apple",
    "banana",
    'pineapple',
    'watermelon',
    "orange",
    "kiwi",
    'strawberry',
    "grapes",
    'blueberry',
    'mango',
    'pear',
    'peach',
  ];




  const moreItems = [
    "cherry",
    "lemon",
    "lime",
    "coconut",
    "papaya",
    "plum",
    "fig",
    "melon",
    "raspberry",
    "blackberry",
    "cranberry",
    "apricot",
  ];


  const scrollWrapperRef = useRef();

  const [tabNodes, updatetabNodes] = useState();
  const [data, updateData] = useState(items);





  const transformWrapper = (transformValue) => {
    scrollWrapperRef.current.style.transform = `translate3d(-${transformValue}px,0px,0px)`;
  };


  const [tabBarScrollState, updateTabBarScrollState] = useReducer(
    (prev, next) => {
      const newEvent = { ...prev, ...next };

      console.log({ xAxis: newEvent.xAxisValue })

      return newEvent;
    },
    {
      tabWidthSum: null,
      selectedTabIndex: 0,
      setEndIndex: null,
      updatedByKeyboardEvent: false,
      startingTabIndex: 0,
      xAxisValue: 0,
      currentTabNodeWidth: null,
      scrolledEndValue: 0,
      hasScrolledToEnd: false,
    },
  );





  useLayoutEffect(() => {
    updatetabNodes(scrollWrapperRef.current.childNodes);

  }, [scrollWrapperRef]);

  const calculateWidth = (event) => {
    const scrollWrapperRefWidth = scrollWrapperRef.current.clientWidth;
    if (event === 'right') {
      let tabWidthSum = 0;
      for (let i = 0; i < tabNodes.length; i++) {
        const width = tabNodes[i].clientWidth;
        if (tabWidthSum + width > scrollWrapperRefWidth + tabBarScrollState.xAxisValue) {
          const difference = tabWidthSum + width - scrollWrapperRefWidth;
          console.log({ difference })
          transformWrapper(difference)
          updateTabBarScrollState({ xAxisValue: difference, startingTabIndex: tabBarScrollState + 1 });
          break;
        }
        tabWidthSum += width;
      }

    }

    if (event === 'left') {
      let tabWidthSum = 0;
      for (let i = 0; i < tabNodes.length; i++) {
        const width = tabNodes[i].clientWidth;
        if (tabWidthSum + width >= tabBarScrollState.xAxisValue) {
          transformWrapper(tabWidthSum)
          updateTabBarScrollState({ xAxisValue: tabWidthSum, startingTabIndex: tabBarScrollState - 1 });

          break;
        }
        tabWidthSum += width;
      }

    }
  };



  const moveRight = () => {
    calculateWidth('right');
  };

  const moveLeft = () => {

    calculateWidth('left')
  };

  const addItem = () => {

    const randomIndex = Math.floor(Math.random() * 12) + 1;
    updateData((prevData) => [...prevData, moreItems[randomIndex]]);


  };

  return (
    <>
      <div className="main">
        <div>
          <button disabled={tabBarScrollState.xAxisValue === 0} onClick={() => moveLeft()}>
            left
          </button>
          <button disabled={tabBarScrollState.xAxisValue === data.length} onClick={() => moveRight()}>
            right
          </button>
        </div>
        <div className="viewport">
          <div className="container" ref={scrollWrapperRef}>
            {data.map((item, index) => (
              <div className="slide" key={index}>
                <button className="slide__number">{item}</button>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => addItem()}>add item</button>
      </div>
    </>
  );
}

export default App;
