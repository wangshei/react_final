import "react-toastify/ReactToastify.css"
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./routes/Index";
import Root from "./routes/Root";
import Games from "./routes/Games";
import StartGame from "./routes/StartGame";
import CardDetail from "./routes/CardDetail";
import EndGame from "./routes/EndGame"
import EditCard from "./routes/EditCard";
import About from "./routes/About";
import AddCard from "./routes/AddCard";


const router = createBrowserRouter([
  {
    element: <Root />, // doesn't need to be called Root
    children: [
      {
        path: "/",
        element: <Index />,
        loader() {
          console.log("Fetching /questions");
          return fetch("/questions")
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch questions: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log("Fetched data:", data);
              return data;
            })
            .catch((error) => {
              console.error("Loader error:", error);
              throw error;
            });
        },
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/questions/:questionId",
        loader({ params }) {
          return fetch(
            `/questions/${params.questionId}?_expand=level`
          ).then((response) => {
            return response.json();
          });
        },
        element: <CardDetail />,
      },
      {
        path: "/add",
        element: <AddCard />,
      },
      {
        path: "/start",
        element: <StartGame />,
      },
      // {
      //   path: "/end",
      //   element: <EndGame />,
      // },
      // {
      //   path: "/questions/:questionId/game",
      //   loader({ params }) {
      //     return fetch(
      //       `/questions/${params.questionId}?_expand=level`
      //     ).then((response) => {
      //       return response.json();
      //     });
      //   },
      //   element: <Games />,
      // },
      {
        path: "/questions/:questionId/edit",
        loader({ params }) {
          return fetch(
            `/questions/${params.questionId}`
          ).then((response) => {
            return response.json();
          });
        },
        element: <EditCard />,
        
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
