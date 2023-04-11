import React,{ useState , useEffect} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData"
import "./App.css";
import { IconContext } from "react-icons";
import axios from 'axios';


function Navbar(){
    const [Sidebar, setSidebar] = useState(false);
    const [Data, setData] = useState();
    const showSidebar = () => setSidebar(!Sidebar);
    // const url = 'http://localhost:1400/Topic';

    // let data;
    // const getdata = () =>{
    //     axios.get(url).then((response) => {
    //         data = response.data;
    //         setData(response.data);
    //         console.log("get Data API" ,data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }
    // useEffect(() => {
    //     getdata();
    // },[]);
    return(
        <div>
        <IconContext.Provider value = {{ color: undefined }}>
            <div className="navbar">
            <Link to="#" className="menu-bar">
                <FaIcons.FaBars onClick={showSidebar}/>
            </Link>
            </div>
            <nav className={Sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items"  onMouseLeave={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                    {/* { Data? Data.map((data,index) =>{
                        console.log(data.Topic);
                        return(
                            <li key={index} className={data.cName}>
                                <Link to={data.Path}>
                                    <span>{data.Topic}</span>
                                </Link>
                            </li>
                        );
                    }) : <h3>Not have data</h3> } */}
                    {SidebarData.map((item, index) => {
                        return(
                            <li key={index} className={item.cName} >
                                <Link to={item.Path}>
                                    <span>{item.Topic}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </div>
    );
}

export default Navbar;