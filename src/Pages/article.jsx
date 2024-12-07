import Navbar from "../Components/Nav";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Flex } from "antd";
import { useEffect, useRef, useState } from "react";
import Artikel from '../data/article.json'
import { Link, useNavigate, useParams } from 'react-router'
import { AuthController } from "../Controller/User";
import { FooterContext } from "./main";


export default function Article() {

    let Navigate = useNavigate();
    let { uuid } = useParams()
    let [Ctg_Data, SetCtg_Data] = useState(null)

    useEffect(() => {
        let inx = Artikel.filter(dt => dt.id == uuid)[0]
        if (inx == null) {
            Navigate("/")
        } else {
            SetCtg_Data(inx)
        }

        AuthController(Navigate)

    }, [uuid])

    return (
        <>
            <Navbar className={'my-5'} />
            <div className="mx-auto w-9/12 mb-10">
                <p className="text-2xl font-semibold text-white mb-3">{Ctg_Data?.title}</p>
                <Flex gap={10} align="center" className="text-white">
                    <p className="text-sm font-medium text-white">Share Article :</p>
                    <Icon className="text-lg" icon={"bi:twitter-x"} />
                    <Icon className="text-lg" icon={"ic:baseline-facebook"} />
                    <Icon className="text-lg" icon={"material-symbols:attachment"} />
                </Flex>
                <img src={Ctg_Data?.image} alt="" className="w-full rounded-2xl my-5" />
                <p className="text-[16px] text-white mt-5">{Ctg_Data?.context}</p>
            </div>
            <FooterContext />
        </>
    )
}