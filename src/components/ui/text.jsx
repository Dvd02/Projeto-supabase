"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Text = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("bg-white/10 rounded-xl p-2 mt-2 mb-2", className)}
        {...props} 
    />
))
Text.displayName = "Text"
export {Text}
