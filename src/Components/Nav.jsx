import { Link, NavLink, useLocation, useNavigate } from "react-router"
import Logo from '../assets/logo.png'
import { Button, Dropdown, Flex } from "antd"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"
import LogoutController, { AuthController } from "../Controller/User"
import Category from '../data/category.json'

export default function Navbar({ className }) {

    let { pathname } = useLocation();


    let [DataUser, SetDataUser] = useState(null)
    let navigate = useNavigate();

    let [NavMenu, setNavMenu] = useState(
        [
            { name: "Home", route: "/" },
            { name: "Profile", route: "/profile" },
            {
                name: "Category",
                route: []
            },
        ]

    )


    useEffect(() => {
        let data = AuthController(navigate)
        SetDataUser(data)
        setNavMenu(dt =>
            dt.map(main => {
                if (main.name === 'Category') {
                    const updatedRoute = [
                        ...main.route,
                        ...Category.map(element => ({
                            key: "sdm_20" + element.name + element.uuid,
                            label: <Link to={`/category/${element.uuid}`}>{element.name}</Link>
                        }))
                    ];
                    return { ...main, route: updatedRoute };
                }
                return main;
            })
        );
    }, [])



    return (
        <nav className={`w-11/12 mx-auto py-2 flex justify-between items-center z-20 relative ${className}`}>
            <Flex align="center" gap={20}>
                <Button icon={<Icon icon={"solar:hamburger-menu-broken"} className="text-xl text-primary" />} shape="circle" className="md:hidden" />
                <img src={Logo} alt="" className="h-[20px]" />
                <div className="hidden md:flex gap-5" >
                    {
                        NavMenu.map((dt, id) => {
                            if (Array.isArray(dt.route)) {
                                return (
                                    <Dropdown key={`navMenuT${id}`} menu={{ items: dt.route }}>
                                        <a onClick={(e) => e.preventDefault()} className={` py-1 flex justify-center items-center gap-2 ${pathname.startsWith("/category/") ? 'border-b-2 border-white text-white hover:text-white' : 'text-white/50 hover:text-white'}`}>{dt.name} <Icon icon={"solar:alt-arrow-down-broken"} /></a>
                                    </Dropdown>
                                )
                            } else {
                                return (
                                    <NavLink key={`navMenuT${id}`} to={dt.route} className={({ isActive }) => isActive ? "text-white py-1 relative hover:text-white border-b-2 border-white" : "text-white/50 hover:text-white py-1"}>{dt.name}</NavLink>
                                )
                            }
                        })
                    }
                </div>

            </Flex>

            <Flex align="center" gap={10}>
                <div className="bg-white h-[35px] px-4 rounded-full flex justify-center items-center max-md:hidden">
                    <input type="text" className="w-[200px] outline-none text-[15px]" />
                    <Icon icon={"solar:magnifer-linear"} />
                </div>
                <Button type="primary" onClick={() => LogoutController(navigate)} shape="circle" icon={<Icon icon={"solar:logout-broken"} className="text-xl" />} />
            </Flex>

        </nav>
    )
}