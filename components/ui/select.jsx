"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons"

const Select = ({ children, value, onValueChange, ...props }) => {
  const [selectedValue, setSelectedValue] = React.useState(value || "")

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <SelectContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange }}>
      <div {...props}>{children}</div>
    </SelectContext.Provider>
  )
}

const SelectContext = React.createContext({
  value: "",
  onValueChange: () => {},
})

const SelectGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
SelectGroup.displayName = "SelectGroup"

const SelectValue = React.forwardRef(({ className, placeholder, ...props }, ref) => {
  const { value } = React.useContext(SelectContext)
  return (
    <span className={className} {...props}>
      {value || placeholder}
    </span>
  )
})
SelectValue.displayName = "SelectValue"

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <button
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>

      {isOpen && <div className="absolute left-0 top-full mt-1 w-full z-50">{props.children}</div>}
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
      className,
    )}
    {...props}
  >
    <div className="p-1">{children}</div>
  </div>
))
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const { onValueChange } = React.useContext(SelectContext)

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </div>
  )
})
SelectItem.displayName = "SelectItem"

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
))
SelectLabel.displayName = "SelectLabel"

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
))
SelectSeparator.displayName = "SelectSeparator"

// Placeholder components to maintain API compatibility
const SelectPrimitive = {
  Icon: ({ asChild, children }) => children,
}

const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
    <ChevronUpIcon className="h-4 w-4" />
  </div>
))
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
    <ChevronDownIcon className="h-4 w-4" />
  </div>
))
SelectScrollDownButton.displayName = "SelectScrollDownButton"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
