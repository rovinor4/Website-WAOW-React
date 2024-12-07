import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Flex } from "antd";
import Navbar from "../Components/Nav";
import { useEffect, useRef, useState } from "react";
import Artikel from '../data/article.json'
import CategoryData from '../data/category.json'
import { Link, useNavigate, useParams } from 'react-router'
import { FooterContext } from "./main";
import { AuthController } from "../Controller/User";

export default function Category() {

    let Navigate = useNavigate();
    let { uuid } = useParams()
    let [Ctg_Data, SetCtg_Data] = useState(null)

    useEffect(() => {
        let inx = CategoryData.filter(dt => dt.uuid == uuid)[0]
        if (inx == null) {
            Navigate("/")
        } else {
            SetCtg_Data(inx)
        }

        AuthController(Navigate)

    }, [uuid])


    function Carousel() {

        const scrollRef = useRef(null);
        const [isAtStart, setIsAtStart] = useState(true);
        const [isAtEnd, setIsAtEnd] = useState(false);
        let x = Artikel.filter(dt => dt.priority == true)

        const checkScroll = (number) => {
            if (!scrollRef.current) return;

            console.log(scrollRef.current);

            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

            setIsAtStart(scrollLeft < 1000);
            setIsAtEnd(scrollWidth - clientWidth - scrollLeft <= 20);

            if (number != null) {
                scrollRef.current.scrollBy({
                    left: number,
                    behavior: "smooth",
                });
            }



        }

        return (
            <div className="grid w-11/12 mx-auto grid-cols-[50px,1fr,50px] my-10">
                <div className="flex items-center justify-center"><Button onClick={() => { checkScroll(-500) }} shape="circle" icon={<Icon icon={"solar:alt-arrow-left-broken"} className="text-xl" />} /></div>
                <div className="overflow-auto relative">
                    {
                        !isAtEnd &&
                        <div className="w-[200px] h-full absolute top-0 right-0 bg-gradient-to-r from-white/0 to-secondary z-[2]" />
                    }
                    <div className="relative w-full flex gap-6 snap-x snap-mandatory scroll-smooth scrollbar-hide" style={{ overflowX: "auto" }} ref={scrollRef} onScroll={() => { checkScroll(null) }}>
                        {
                            x.map((dt, id) => {
                                return (
                                    <Link to={`/article/${dt.id}`} className="w-[500px] h-[250px] relative overflow-hidden rounded-xl cursor-pointer snap-start shrink-0" key={`article_prority${id}`}>
                                        <img src={dt.image} className="w-full h-full absolute top-0 left-0 z-0" alt="" />
                                        <div className="absolute z-[1] bg-black/20 backdrop-blur-sm bottom-0 left-0 p-4 w-full">
                                            <p className="text-white font-medium text-[15px]">{dt.title}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex items-center justify-center"><Button shape="circle" icon={<Icon icon={"solar:alt-arrow-right-broken"} className="text-xl" />} onClick={() => { checkScroll(500) }} /></div>
            </div>
        )
    }


    return (
        <>
            <Navbar className={'mt-5 mb-7'} />
            <Flex justify="center" align="center" className="text-white text-2xl font-semibold" gap={10}>
                <p>{Ctg_Data?.name}</p>
                <Icon icon={Ctg_Data?.icon} />
            </Flex>
            <Carousel />

            <div className="w-8/12 mx-auto">
                <p className="text-2xl font-semibold text-white">Latest Article</p>
                <div className="my-10">
                    {
                        Artikel.filter(dt => dt.priority == false).map((dt, id) => {
                            return (
                                <Link to={`/article/${dt.id}`} key={`article_${id}`}>
                                    <div className="grid grid-cols-[300px,1fr] gap-10" key={`article_${id}`}>
                                        <img src={dt.image} className="aspect-video rounded-2xl" alt="" />
                                        <div>
                                            <p className="text-xl font-semibold text-white">{dt.title}</p>
                                            <Flex gap={10} className="text-sm text-white">
                                                <p>{dt.creator}</p>
                                                <p className="text-white/50">{dt.date}</p>
                                            </Flex>
                                        </div>
                                    </div>
                                    {
                                        id != (Artikel.filter(dt => dt.priority == false).length - 1) &&
                                        <hr className="my-10" key={`hrArticle_${id}`} />
                                    }
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

            <FooterContext />

        </>
    )
}