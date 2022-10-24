import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "./contexts/ContextProvider";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from "./pages";
import "./App.css";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg ">
          <div className="fixed right-4 bottom-4  " style={{ zIndex: "1000" }}>
            <TooltipComponent content="setting" position="top">
              <button
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ background: currentColor, borderRadius: "50%" }}
                onClick={() => setThemeSettings(true)}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {activeMenu ? (
            // sidebar will make it above the navbar if you don't write it ,it will be below the nav
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen  w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg  navbar w-full">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                <Route path="/DashboardReact" element={<Ecommerce />} />
                <Route
                  path="/DashboardReact/ecommerce"
                  element={<Ecommerce />}
                />

                <Route path="/DashboardReact/orders" element={<Orders />} />
                <Route
                  path="/DashboardReact/employees"
                  element={<Employees />}
                />
                <Route
                  path="/DashboardReact/customers"
                  element={<Customers />}
                />

                <Route path="/DashboardReact/kanban" element={<Kanban />} />
                <Route path="/DashboardReact/editor" element={<Editor />} />
                <Route path="/DashboardReact/calendar" element={<Calendar />} />
                <Route
                  path="/DashboardReact/color-picker"
                  element={<ColorPicker />}
                />

                <Route path="/DashboardReact/line" element={<Line />} />
                <Route path="/DashboardReact/area" element={<Area />} />
                <Route path="/DashboardReact/bar" element={<Bar />} />
                <Route path="/DashboardReact/pie" element={<Pie />} />
                <Route
                  path="/DashboardReact/financial"
                  element={<Financial />}
                />
                <Route
                  path="/DashboardReact/color-mapping"
                  element={<ColorMapping />}
                />
                <Route path="/DashboardReact/pyramid" element={<Pyramid />} />
                <Route path="/DashboardReact/stacked" element={<Stacked />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
