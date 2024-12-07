import LoginPage from '../assets/Login.png'
import LoginCoder from '../assets/logo_coder.png'
import LoginIlustrasi from '../assets/ilustrasi.png'
import { Button, Checkbox, Flex } from 'antd'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { Input } from '../Components/Form'
import { GuestController, RegisterController } from '../Controller/User'

export default function Register() {

    let navigate = useNavigate()
    let [Respond, setRespond] = useState({ status: null, error: null })
    let [Values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: ""
    })

    let [Psw, SetPsw] = useState(false)


    function handleChange(key, value) {
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }


    function Submit(e) {
        let data = RegisterController(Values)
        if (data.status == true) {
            setValues({
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                password: ""
            })
            navigate("/login")
        }
        setRespond(data)
        e.preventDefault();
    }

    useEffect(() => {
        GuestController(navigate)
    }, [])

    return (
        <>
            <img src={LoginPage} className='w-full h-full fixed top-0 left-0 max-lg:hidden object-cover object-bottom' alt="" />
            <div className="w-full h-screen grid grid-cols-2 z-10 relative">
                <div className='flex flex-col justify-center p-8'>
                    <img src={LoginIlustrasi} alt="" className='w-[600px]' />
                    <div>
                        <img src={LoginCoder} alt="" className='h-14' />
                    </div>
                </div>
                <div className='flex justify-center items-center flex-col'>
                    <img src={LoginCoder} alt="" className='h-14 mb-8 md:hidden' />
                    <p className='text-white font-bold text-3xl text-center'>WAOW <span className='font-medium ms-2'>Register</span></p>
                    <form onSubmit={Submit} className='w-[450px] mt-5 '>
                        <div className="grid grid-cols-2 my-6 gap-5">
                            <Input error={Respond.error?.first_name?.[0] ?? ''} value={Values.first_name} active onInput={(e) => handleChange('first_name', e.target.value)} placeholder={'First Name'} />
                            <Input error={Respond.error?.last_name?.[0] ?? ''} value={Values.last_name} onInput={(e) => handleChange('last_name', e.target.value)} placeholder={'Last Name'} />
                        </div>
                        <Input error={Respond.error?.email?.[0] ?? ''} className={'my-6'} value={Values.email} onInput={(e) => handleChange('email', e.target.value)} icon={"solar:letter-broken"} placeholder={'Email'} />
                        <Input error={Respond.error?.phone_number?.[0] ?? ''} active className={'my-6'} value={Values.phone_number} onInput={(e) => handleChange('phone_number', e.target.value)} icon={"solar:phone-broken"} placeholder={'Phone Number'} typeInput='number' />
                        <Input error={Respond.error?.password?.[0] ?? ''} className={'my-6'} value={Values.password} onInput={(e) => handleChange('password', e.target.value)} onClick={() => SetPsw(d => !d)} typeInput={Psw ? 'text' : 'password'} icon={Psw ? "solar:eye-broken" : "solar:eye-closed-broken"} placeholder={'Password'} />
                        <button type='submit' className='w-10/12 bg-white text-primary py-3 px-4 rounded-full mx-auto mt-24 flex justify-center items-center gap-1'>
                            <span className='text-lg font-semibold'>Register</span>
                            <Icon icon={"material-symbols:arrow-right-alt-rounded"} className='text-2xl' />
                        </button>
                        <p className='text-center mt-6 text-white text-[15px]'>Have an Account? <Link to={"/login"} className='font-semibold'>Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}