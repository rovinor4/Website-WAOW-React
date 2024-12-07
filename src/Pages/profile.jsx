import { useEffect, useState } from "react";
import Navbar from "../Components/Nav";
import LogoutController, { AuthController, UpdateProfileController } from "../Controller/User";
import { useNavigate } from "react-router";
import { Button, Flex, Image, Input } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Profile() {

    let [DataUser, SetDataUser] = useState(null)
    let [Profile, SetProfile] = useState(null)
    let [EditProfile, SetEditProfile] = useState(false)
    let [Respond, SetRespond] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        let data = AuthController(navigate)
        SetDataUser(data)
    }, [])


    const SavingOn = () => {
        let x = UpdateProfileController({ image: Profile })
        SetRespond(x)
    }





    return (
        <>
            <Navbar className={'mt-5'} />

            <div className="w-10/12 lg:w-[900px] bg-primary pt-20 mx-auto mt-10 rounded-xl relative px-8 pb-10">
                <div className="absolute top-0 left-0 bg-secondary px-6 py-3 rounded-br-xl text-white text-xl font-bold">
                    <p>Profile</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-10">
                        <div>
                            <p className="text-white/80 text-sm font-semibold">Name</p>
                            <p className="underline text-white">{DataUser?.first_name} {DataUser?.last_name}</p>
                        </div>
                        <div>
                            <p className="text-white/80 text-sm font-semibold">Email</p>
                            <p className="underline text-white">{DataUser?.email}</p>
                        </div>
                        <div>
                            <p className="text-white/80 text-sm font-semibold">Phone</p>
                            <p className="underline text-white">{DataUser?.phone_number}</p>
                        </div>
                        <div>
                            {
                                DataUser?.role &&
                                <Button onClick={() => LogoutController(navigate)}>Buka Dashboard Admin</Button>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div className="relative overflow-hidden">
                            <Image preview={false} fallback="https://imageupscaler.com/wp-content/uploads/2024/07/maple-leaf-enlarged.jpg" src={Profile ?? DataUser?.profile} width={200} className="aspect-square rounded-full object-cover object-center" alt="" />
                            <Button onClick={() => SetEditProfile(true)} className="absolute bottom-2 right-1" shape="circle" size="large" icon={<Icon icon={"solar:gallery-edit-linear"} className="text-xl text-primary" />} />
                        </div>
                        {
                            EditProfile &&
                            <div>
                                <Flex gap={10}>
                                    <Input onInput={(e) => SetProfile(e.target.value)} placeholder="Enter the image url" />
                                    <Button danger type="primary" onClick={() => { SetEditProfile(false); SetProfile(null); SetRespond(null); }}>Cancel</Button>
                                </Flex>
                                <p className="text-xs text-red-500 mt-1">{Respond?.error?.image?.[0] ?? ''}</p>
                            </div>
                        }
                        <Button type="primary" className="bg-secondary" onClick={SavingOn}>Save</Button>
                    </div>
                </div>
            </div>
        </>
    )

}