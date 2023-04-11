import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
// import axios from 'axios';
import Bisection from "./Root of Equation/Bisection";
import Falseposition from "./Root of Equation/Falsepositon";
import NewtonRaphson from "./Root of Equation/NewtonRaspson";
import Onepoint from "./Root of Equation/Onepoint";
import Home from "./Root of Equation/Home";
import "./App.css";
import "./style.css";
import Navbar  from "./Navbar";
import Secant from "./Root of Equation/Secant";
import Cramer from "./Linear/CramerRule";
import Gauss from "./Linear/Gauss";
import GaussJordan from "./Linear/GaussJordan";
import LUDecomposition from "./Linear/LUDecomposition";
import Cholesky from "./Linear/Cholesky";
import Jacobi from "./Linear/Jacobi";
import GaussSeidal from "./Linear/GaussSeidal";
import Lagrange  from "./Interpolation/Lagrange";
import Regression from "./Regression/PolynomialRegression";

const AppLayout = () => (
    <>
    <Navbar/>
    <Outlet/>
    </>
);
const router = createBrowserRouter(
    createRoutesFromElements( 
       <Route element = {<AppLayout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/bisection" element={<Bisection/>}/>
            <Route path="/false-position" element={<Falseposition/>}/>
            <Route path="/onepointIteration" element={<Onepoint/>}/>
            <Route path="/newton-raphson" element={<NewtonRaphson/>}/>
            <Route path="/secant" element={<Secant/>}/>
            <Route path="/cramer" element={<Cramer/>}/>
            <Route path="/gauss" element={<Gauss/>}/>
            <Route path="/gaussjordan" element={<GaussJordan/>}/>
            <Route path="/ludecomposition" element={<LUDecomposition/>}/>
            <Route path="/choleskydecomposition" element={<Cholesky/>}/>
            <Route path="/jacobi" element={<Jacobi/>} />
            <Route path="/gaussseidal" element={<GaussSeidal/>}/>
            <Route path="/lagrange" element={<Lagrange />} />
            <Route path="/polynomialregress" element={<Regression/>} />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);