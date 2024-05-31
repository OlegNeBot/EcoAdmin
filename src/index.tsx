import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {ConfigProvider} from "antd";
import ruRu from "antd/locale/ru_RU";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <ConfigProvider
            locale={ruRu}
            theme={{
                token: {
                    colorPrimary: "#4D7D0F",
                    colorIcon: "#FFFFFF",
                    fontFamily: "Segoe UI",
                },
                components: {
                    Table: {
                        headerBg: "#4D7D0F",
                        headerColor: "#FFFFFF",
                    },
                    Layout: {
                        lightSiderBg: "#4D7D0F",
                        lightTriggerBg: "#4D7D0F",
                        lightTriggerColor: "#FFFFFF",
                    },
                    Menu: {
                        itemBg: "#4D7D0F",
                        itemColor: "#FFFFFF",
                    },
                },
            }}
        >
            <App />
        </ConfigProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
