'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {signIn} from "next-auth/react"
import React, { useState } from 'react';
import Image from 'next/image';
import Paris from '../../../../public/assets/paris.jpg'
import { resolve } from 'styled-jsx/css';
import { schema } from './schema';
import { data } from 'autoprefixer';
import { register } from 'next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup';
import { object } from 'zod';
import toast from 'react-hot-toast';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import Link from 'next/link';
const Login = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
    
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolve: zodResolver(schema),
        });

        const onSubmit = async (data) => {
            if (Object.keys(errors)?.length > 0) {
                toast.error('Enter valid data');
                return;
            }
            setIsLoading(true)

            try {
              const res = await signIn("credentials", {...data, redirect: false})

              if(res?.error == null){
                router.push("/")
              } else {
                toast.error("Email or password invalid")
              }
            } catch (error) {
              console.log(error)
            }

            setIsLoading(false)
        };
 
    return (
        <div className="relative h-screen w-full">
            <div className="relative h-full w-full">
                <Image
                    className="brightness-50 h-full w-full object-cover"
                    src={Paris}
                    alt="Login's image"
                />
                <div className="h-[350px] w-[350px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg ">
                    <h2 className="text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500">
                        Log into your account
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 flex flex-col w-full gap-8 items-center"
                    >
                        <Input
                            className="w-full text-center mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-e-slate-500"
                            type="email"
                            placeholder="hongnhung0404@gmail.com"
                            register={register('email')}
                        />
                        <Input
                            className="w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-e-slate-500"
                            type="password"
                            placeholder="********"
                            register={register('password')}
                        />
                        <Button
                          disabled={isLoading}                      
                            label="Submit"
                            className="w-3/4 mx-auto mt-8 cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600"
                        />
                    </form>
                    <p className='text-center'><Link href={'/signup'} className='hover:underline'>Signup</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
