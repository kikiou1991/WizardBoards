"use client"
import React, { useState } from 'react'
import Link from 'next/link';

import { MenuItem } from './header';

interface Props {
    item: MenuItem;
}

export default function Dropdown(props: Props) {
    const { item } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuItems = item?.children ? item.children : [];

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen
        ?
        "flex"
        :
        "hidden";

    return (
        <>
            <div className="relative">
                <button
                    className="hover:bg-[#3d51a1] rounded-lg px-2"
                    onClick={toggle}
                >{item.title}</button>
                <div className={`absolute top-8 z-30 w-[250px] min-h-[100px] flex flex-col py-4 bg-slate-100 rounded-md ${transClass}`}>
                    {
                        menuItems.map(item =>
                            <Link
                                key={item.route}
                                className=" hover:text-[#3d51a1] px-4 py-1"
                                href={item?.route || ''}
                                onClick={toggle}
                            >{item.title}</Link>
                        )
                    }
                </div>
            </div>
            {
                isOpen
                    ?
                    <div
                        className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40"
                        onClick={toggle}
                    ></div>
                    :
                    <></>
            }
        </>
    )
}