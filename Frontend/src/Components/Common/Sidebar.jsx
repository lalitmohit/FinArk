import React, {useEffect, useState} from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import  SideLogo from "../../Assets/SideLogo.svg"; 
import Analytics from "../../Assets/Analytics.svg";
import  Campaigns from "../../Assets/Campaigns.svg";
import ChatSupport from "../../Assets/ChatSupport.svg";
import Credits from "../../Assets/Credits.svg";
import Customers from "../../Assets/Customers.svg"; 
import  Dashboard from "../../Assets/Dashboard.svg";    
import Factory from "../../Assets/Factory.svg";
import Inventory from "../../Assets/Inventory.svg"; 
import Love from "../../Assets/Love.svg";
import Profile from "../../Assets/Profile.svg";
import Roles from "../../Assets/Roles.svg";
import Products from "../../Assets/Products.svg";
import Users from "../../Assets/Users.svg";


const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="Container-Sidebar">
            <NavLink to="/home" className="Nav-OnePocket">
                <div className="Sidebar-OnePocket">
                    <div></div>
                    <img src={SideLogo} alt="SideLogo" className="Image-Sidebar" />
                    <div className="Text-OnePocket">onepocket</div>
                </div>
            </NavLink>

            
            <NavLink to="/products" className="Nav-Products">
                <div className="Sidebar-Products">
                    <img src={Products} alt="Product" />
                    <div className="Products">Products</div>
                </div>   
            </NavLink>

            <NavLink to="/customers" className="Nav-Customers">
                <div className="Sidebar-Customers">
                    <img src={Customers} alt="Customers" />
                    <div className="Customers">Acquired Customers</div>
                </div>
            </NavLink>

            <NavLink to="/chatsupport" className="Nav-ChatSupport">
                <div className="Sidebar-ChatSupport">
                    <img src={ChatSupport} alt="ChatSupport" />
                    <div className="ChatSupport">Chat Support</div>
                </div>
            </NavLink>

            <NavLink to="/campaigns" className="Nav-Campaigns">
                <div className="Sidebar-Campaigns">
                    <img src={Campaigns} alt="Campaigns" />
                    <div className="Campaigns">Campaigns</div>
                </div>
            </NavLink>

            <NavLink to="/credits" className="Nav-Credits">
                <div className="Sidebar-Credits">
                    <img src={Credits} alt="Credits" />
                    <div className="Credits">Credits</div>
                </div>
            </NavLink>

            <NavLink to="/inventory" className="Nav-Inventory">
                <div className="Sidebar-Inventory">
                    <img src={Inventory} alt="Inventory" />
                    <div className="Inventory">Inventory</div>
                </div>
            </NavLink>

            <NavLink to="/analytics" className="Nav-Analytics">
                <div className="Sidebar-Analytics">
                    <img src={Analytics} alt="Analytics" />
                    <div className="Analytics">Analytics</div>
                </div>
            </NavLink>

            <NavLink to="/factory" className="Nav-Factory">
                <div className="Sidebar-Factory">
                    <img src={Factory} alt="Factory" />
                    <div className="Factory">Factory</div>  
                </div>
            </NavLink>

            <NavLink to="/users" className="Nav-Users">
                <div className="Sidebar-Users">
                    <img src={Users} alt="Users" />
                    <div className="Users">Users</div>
                </div>
            </NavLink>

            <NavLink to="/roles" className="Nav-Roles">
                <div className="Sidebar-Roles">
                    <img src={Roles} alt="Roles" />
                    <div className="Roles">Roles</div>
                </div>
            </NavLink>

            <NavLink to="/dashboard" className="Nav-Dashboard">
                <div className="Sidebar-Dashboard">
                    <img src={Dashboard} alt="Dashboard" />
                    <div className="Dashboard">Dashboard</div>
                </div>
            </NavLink>

            <NavLink to="/profile" className="Nav-Profile">
                <div className="Sidebar-Profile">
                    <img src={Profile} alt="Profile" />
                    <div className="Profile">Profile</div>
                </div>
            </NavLink>

            <NavLink to="/company" className="Nav-Company">
                <div className="Sidebar-Company">
                    <img src={Love} alt = "Company Logo" />
                    <div className="Company"> Company Logo</div>
                </div>
            </NavLink>

        </div>

    )
}

export default Sidebar;
