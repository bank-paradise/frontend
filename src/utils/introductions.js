const steps = [
  {
    id: "balance",
    attachTo: { element: "#balande-account-container", on: "bottom" },
    buttons: [
      {
        classes: "shepherd-button-secondary",
        text: "Exit",
        type: "cancel",
      },
      {
        classes: "shepherd-button-primary",
        text: "Back",
        type: "back",
      },
      {
        classes: "shepherd-button-primary",
        text: "Next",
        type: "next",
      },
    ],
    title: "Welcome to React-Shepherd!",
    text: [
      "React-Shepherd is a JavaScript library for guiding users through your React app.",
    ],
  },
  {
    id: "transactions",
    attachTo: { element: "#payment-account-container", on: "bottom" },
    buttons: [
      {
        classes: "shepherd-button-secondary",
        text: "Exit",
        type: "cancel",
      },
      {
        classes: "shepherd-button-primary",
        text: "Back",
        type: "back",
      },
      {
        classes: "shepherd-button-primary",
        text: "Next",
        type: "next",
      },
    ],
    title: "Welcome to React-Shepherd!",
    text: [
      "React-Shepherd is a JavaScript library for guiding users through your React app.",
    ],
  },
];

export default steps;
