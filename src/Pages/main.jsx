import { Button, Carousel, Flex, Input, Space, Tag } from "antd";
import Navbar from "../Components/Nav";
import Imager from '../assets/imager.png'
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import Category from '../data/category.json'
import FooterImage from '../assets/footer.png'
import { Link } from "react-router";

function CarouselEvent() {
    let [Number, SetNumber] = useState(0)
    let crl = useRef()

    let DataCarousel = [
        {
            text: "Mavuika, Pyro Archon yang Bersejarah Akhirnya Hadir di Genshin Impact Versi 5.3",
            tag: ['genshin', 'update', 'pyro'],
            img: Imager
        },
        {
            text: "Beli Diamond Mobile Legends Jauh Lebih Murah Di Situs Itu",
            tag: ['mobile-legends', 'promo', 'diamond'],
            img: 'https://en.moonton.com/upload/image/20221017/f43b62642a04d6e4998511b39f341515.jpg'
        },
        {
            text: "Tantang Dirimu di Event Baru PUBG: Survivor of the Winter",
            tag: ['pubg', 'event', 'winter'],
            img: 'https://t2.tudocdn.net/602246?w=1920&h=1440'
        },
        {
            text: "Ragnarok Online: Classic Server Kini Resmi Dibuka!",
            tag: ['ragnarok', 'classic-server', 'mmorpg'],
            img: 'https://cdn.mmoculture.com/mmo-images/2021/05/Ragnarok-Online-image-2021-1.png'
        },
        {
            text: "Free Fire x Spider-Man: Kolaborasi Superhero yang Mengejutkan",
            tag: ['free-fire', 'spider-man', 'crossover'],
            img: 'https://cdn.oneesports.id/cdn-data/sites/2/2023/05/348356621_805595360659654_1021246343238629982_n.jpg'
        }
    ];



    return (
        <>
            <div className="w-full h-[550px] relative pt-5 overflow-hidden bg-primary">
                <Navbar />
                <div className="absolute top-0 left-0 w-full h-full z-[1] bg-gradient-to-r from-secondary sm:from-20% to-transparent" />
                {
                    DataCarousel.map((dt, id) => {
                        return <img key={DataCarousel + id + "image"} src={dt.img} alt="" className={`absolute w-full h-full object-cover object-center ${id == Number ? 'bottom-0' : '-bottom-full'} transition-all duration-300 ease-in-out`} />
                    })
                }
                <div className="relative">
                    <Carousel infinite afterChange={(x) => SetNumber(x)} beforeChange={(x) => SetNumber(x)} ref={crl} style={{ height: 400, zIndex: 5, position: 'relative', marginTop: 20 }} className="w-11/12 mx-auto overflow-hidden">
                        {
                            DataCarousel.map((dt, idm) => {
                                return (
                                    <div key={`DataCarousel${idm}`} className="h-[350px]">
                                        <div className="w-10/12 sm:w-[300px] flex flex-col justify-center h-full">
                                            <p className="text-2xl font-semibold text-white">{dt.text}</p>
                                            <Flex wrap gap={10} className="mt-5">

                                                {
                                                    dt.tag.map((mx, idp) => {
                                                        return (
                                                            <div className="py-0.5 px-4 rounded text-white border border-white" key={`idLx${idm}${idp}`}>{mx}</div>
                                                        )
                                                    })
                                                }
                                            </Flex>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                    <Button onClick={() => crl.current.next()} className="absolute right-5 z-20 top-1/2 -translate-y-1/2" shape="circle" icon={<Icon icon={"solar:alt-arrow-right-broken"} className="text-2xl text-primary" />} />
                </div>
            </div>
        </>
    )
}

function CategoryList() {
    let [Data, SetData] = useState();

    function chunkArray(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }

    useEffect(() => {
        SetData(chunkArray(Category, 4))
    }, [])


    return (
        <div className="w-11/12 md:max-w-[950px] mx-auto my-20 ">
            <p className="text-xl font-semibold text-white mb-8">Browse By Category</p>
            <Carousel arrows dots={false}>
                {
                    Data?.map((dt, id) => {
                        return (
                            <div className="px-8 md:px-14">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
                                    {
                                        dt.map((dp, it) => {
                                            return (
                                                <Link to={`/category/${dp.uuid}`} className="bg-secondary border-2 rounded-xl border-white p-3 aspect-square flex flex-col gap-4 justify-center items-center group hover:bg-white cursor-pointer transition-all">
                                                    <Icon icon={dp.icon ?? "game-icons:ghost"} className="text-7xl md:text-8xl block mx-auto text-white group-hover:text-primary" />
                                                    <p className="bg-white text-secondary font-semibold rounded-xl max-md:text-xs py-2 px-4 text-center w-11/12 group-hover:bg-secondary group-hover:text-white">{dp.name}</p>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}


function VideoContext() {
    let data = [
        { title: "FFWS ID 2024 SPRING - GRAND FINALS", image: "https://row.haluan.co/wp-content/uploads/2023/09/free-fire-1-3.jpg", created_at: "12 Dec 2024", author: "Garena Free Fire", youtube: "https://www.youtube.com/live/6VEZ0nCIHdE?si=BpumAk6cwYH_Fd48" },
        { title: "Unite for 11/11 | Double 11 Event Overview | Mobile Legends: Bang Bang", image: "https://i.ytimg.com/vi/P1daGWJ8u9k/maxresdefault.jpg", created_at: "12 Dec 2024", author: "Mobile Legends", youtube: "https://youtu.be/P1daGWJ8u9k?si=eeI2GatPSeMDeH6w" },
        { title: "PUBG MOBILE | Kolaborasi Ransel Eksklusif American Tourister Resmi Dirilis", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkX5zvuFT7SU5OmVRg4ntM1pGm87QawG9DCQ&s", created_at: "12 Dec 2024", author: "PUBG Mobile", youtube: "https://youtu.be/rAFb1WPu9fQ" },
    ]

    return (
        <div className="grid md:grid-cols-3 gap-10 my-20 w-10/12 mx-auto">
            {
                data.map((dt, id) => {
                    return (
                        <a href={dt.youtube} target="_blank" className="bg-primary p-5 rounded-xl shadow-md" key={`data${id}`}>
                            <div className="relative">
                                <Flex justify="center" align="center" className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 rounded-full backdrop-blur">
                                    <Icon icon={"solar:play-bold"} className="text-white text-xl" />
                                </Flex>
                                <img src={dt.image} alt="" className="aspect-video rounded-xl w-full" />
                            </div>
                            <p className="my-3 text-white font-semibold">{dt.title}</p>
                            <Flex gap={10} className="text-xs mt-3">
                                <p className="text-white">{dt.author}</p>
                                <p className="text-white/50">{dt.created_at}</p>
                            </Flex>
                        </a>
                    )
                })
            }
        </div>

    )
}

export function FooterContext() {
    let Medsos = [
        { icon: "mdi:instagram", url: "https://www.instagram.com/rovino_ramadhani/" },
        { icon: "cib:facebook", url: "https://www.facebook.com/rovinor/" },
        { icon: "simple-icons:linkedin", url: "https://www.linkedin.com/in/rovino-ramadhani/" },
    ];
    return (
        <footer className="bg-black/20 pt-10 pb-5">
            <div className="grid md:grid-cols-3 gap-5 w-11/12 mx-auto">
                <div>
                    <p className="text-5xl font-semibold text-white">WAOW</p>
                    <Flex gap={10} className="mt-5">
                        {
                            Medsos.map((dt, id) => {
                                return (
                                    <a target="_blank" href={dt.url} key={`medsos ${id}`} className="bg-white/30 flex justify-center items-center w-9 h-9 rounded-full">
                                        <Icon icon={dt.icon} className="text-xl text-white" />
                                    </a>
                                )
                            })

                        }
                    </Flex>
                    <Flex gap={10} className="mt-10">
                        <p className="font-semibold text-white">Home</p>
                        <p className="font-semibold text-white">Work</p>
                        <p className="font-semibold text-white">Blog</p>
                        <p className="font-semibold text-white">About</p>
                    </Flex>
                </div>
                <Flex justify="center" align="center" vertical={true}>
                    <div>
                        <p className="mb-3 font-semibold text-white">Subscribe to WAOW</p>
                        <Space.Compact>
                            <Input />
                            <Button type="primary">Submit</Button>
                        </Space.Compact>
                    </div>
                </Flex>
                <Flex justify="center" align="center">
                    <img src={FooterImage} className="h-[200px]" alt="" />
                </Flex>
            </div>
        </footer>
    )
}



export default function () {
    return (
        <>
            <CarouselEvent />
            <CategoryList />
            <VideoContext />
            <FooterContext />
        </>
    )
}