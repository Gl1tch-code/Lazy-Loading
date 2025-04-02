import React from "react";
import useLazyLoad from "./core/useLazyLoad";
import Card from "./components/Card";
import "./App.css";

const App = () => {
  const renderedItems = useLazyLoad(50, ({ index, isVisible }) => (
    <Card index={index} isVisible={isVisible} />
  ));

  return (
    <div className="app-container">
      <h1 className="app-title">Lazy Load Components</h1>
      <div className="grid-container">
        {renderedItems.map((item) => (
          <div
            key={item.index}
            data-index={item.index}
            ref={item.ref}
            className="grid-item"
          >
            {item.renderedComponent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;