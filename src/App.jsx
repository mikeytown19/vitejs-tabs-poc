import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const items = [
    'apple',
    'banana',
    'orange',
    'grapes',
    'kiwi',
    'pineapple',
    'watermelon',
    'strawberry',
    'blueberry',
    'mango',
    'pear',
    'peach',
  ];

  const moreItems = [
    'cherry',
    'lemon',
    'lime',
    'coconut',
    'papaya',
    'plum',
    'fig',
    'melon',
    'raspberry',
    'blackberry',
    'cranberry',
    'apricot',
  ];

  const [count, setCount] = useState(0);
  const container = useRef();
  const [x, setXValue] = useState(0);
  const [childWidth, setChildWidth] = useState();
  const [kids, updateKids] = useState();
  const [data, updateData] = useState(items);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      container.current.style.transform = `translate3d(-${
        container.current.scrollWidth - container.current.clientWidth
      }px, 0px, 0px)`;
      console.log(
        container.current.scrollWidth - container.current.clientWidth
      );
      const width = kids[count].clientWidth;
      console.log(kids[0], kids[count]);
      setChildWidth(width);
      setXValue(container.current.scrollWidth - container.current.clientWidth);
      setIsLoaded(false);
      console.log({ kids, data, x, childWidth });
    }
  }, [isLoaded]);

  useEffect(() => {
    updateKids(container.current.childNodes);
  }, [container]);

  const moveRight = () => {
    const width = kids[count].clientWidth;
    setChildWidth(width);

    setXValue(x + width);
    setCount(count + 1);

    container.current.style.transform = `translate3d(-${width + x}px,0px,0px)`;
  };

  const moveLeft = () => {
    setCount(count - 1);

    const width = kids[count - 1].clientWidth;
    setChildWidth(width);
    setXValue(x - childWidth);
    console.log(x, width, childWidth);
    container.current.style.transform = `translate3d(-${x - width}px,0px,0px)`;
  };

  const addItem = () => {
    setCount(data.length);
    const randomIndex = Math.floor(Math.random() * 12) + 1;
    updateData((prevData) => [...prevData, moreItems[randomIndex]]);

    setIsLoaded(true);
  };

  return (
    <>
      <div className="main">
        <div>
          <button disabled={count === 0} onClick={() => moveLeft()}>
            left
          </button>
          <button disabled={count === data.length} onClick={() => moveRight()}>
            right
          </button>
        </div>
        <div className="viewport">
          <div className="container" ref={container}>
            {data.map((item) => (
              <div className="slide">
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
