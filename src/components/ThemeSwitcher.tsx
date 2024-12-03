"use client"

import { DesktopIcon } from '@radix-ui/react-icons'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null


  return (
    <Tabs defaultValue={theme}>
        <TabsList>
            <TabsTrigger value='light' onClick={() => setTheme("light")}>
                <SunIcon className='size-5' />
            </TabsTrigger>

            <TabsTrigger className='size-5 rotate-90 transition-all dark:rotate-0' value='dark' onClick={() => setTheme("dark")}>
                <MoonIcon className='size-5' />
            </TabsTrigger>

            <TabsTrigger value='system' onClick={() => setTheme("system")}>
                <DesktopIcon className='size-5' />
            </TabsTrigger>
        </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher