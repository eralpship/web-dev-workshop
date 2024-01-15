import React from "react";

export default function MyComponent() {
  return (
    <div style={{ textAlign: "left" }}>
      <h2>My Component</h2>
      <p>
        This is my component. It's a great component. Here are the best things
        about my component;
      </p>
      <ul>
        <li>It's my component.</li>
        <li>It's not your component.</li>
      </ul>
    </div>
  );
}

export function MyComponentWithoutJsx() {
  return React.createElement(
    "div",
    { style: { textAlign: "left" } },
    React.createElement("h2", {}, "My Component without jsx"),
    React.createElement(
      "p",
      {},
      "This is my component. It's a great component. Here are the best things about my component;"
    ),
    React.createElement(
      "ul",
      {},
      React.createElement("li", {}, "It's my component."),
      React.createElement("li", {}, "It's not your component.")
    )
  );
}
