import { Navigate, Route, Routes } from "react-router-dom";
import { FormPage, MainPage } from "../pages";

export const PanelRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ < MainPage/> } />
        <Route path="/form" element={ < FormPage /> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}