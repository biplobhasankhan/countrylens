"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "@/components/icons"

const DropdownMenu = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}

const DropdownMenuTrigger = React.forwardRef(({ className, asChild, children, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  return (
    <Comp ref={ref} className={cn("inline-flex items-center justify-center", className)} {...props}>
      {children}
    </Comp>
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  return (
    <div
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className,
      )}
      style={{ position: "absolute", top: `calc(100% + ${sideOffset}px)`, right: 0 }}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef(({ className, inset, children, onClick, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        inset && "pl-8",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

// Simplified versions of other dropdown components
const DropdownMenuGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
DropdownMenuGroup.displayName = "DropdownMenuGroup"

const DropdownMenuPortal = ({ children, ...props }) => <div {...props}>{children}</div>
const DropdownMenuSub = ({ children, ...props }) => <div {...props}>{children}</div>
const DropdownMenuRadioGroup = ({ children, ...props }) => <div {...props}>{children}</div>

const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </button>
))
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
      className,
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {checked && <CheckIcon className="h-4 w-4" />}
    </span>
    {children}
  </button>
))
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <CircleIcon className="h-2 w-2 fill-current" />
    </span>
    {children}
  </button>
))
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <div ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)} {...props} />
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuShortcut = ({ className, ...props }) => {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
