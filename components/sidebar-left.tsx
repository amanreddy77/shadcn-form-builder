"use client"

import * as React from "react"
import { useFormStore } from "@/stores/form"
import { Search } from "lucide-react"
import { useShallow } from "zustand/shallow"

import { fields } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/logo"

import { FormState } from "@/types/form-store"

const selector = (state: FormState) => ({
  addFormField: state.addFormField,
  setIsEditFormFieldOpen: state.setIsEditFormFieldOpen,
  setSelectedFormField: state.setSelectedFormField,
})

// Group fields by category
const fieldGroups = {
  "TEXT ELEMENTS": ["Short Answer", "Paragraph"],
  "MULTIPLE CHOICE": ["Dropdown", "Radio", "Yes / No", "Dropdown"],
  "MEDIA ELEMENT": ["Upload", "Image"],
}

export function SidebarLeft() {
  const { addFormField, setSelectedFormField, setIsEditFormFieldOpen } =
    useFormStore(useShallow(selector))

  const [searchQuery, setSearchQuery] = React.useState("")

  const handleFieldClick = (field: any) => {
    const newFormField = {
      ...field,
      id: Math.random().toString().slice(-10),
      name: `${field.name.toLowerCase().replaceAll(" ", "_")}_${Math.random().toString().slice(-10)}`,
    }
    addFormField(newFormField)
    setSelectedFormField(newFormField.id)
    setIsEditFormFieldOpen(true)
  }

  const filteredFields = fields.filter((field) =>
    field.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="h-16 border-b">
        <div className="my-auto flex w-fit items-center gap-2">
          <div className="flex aspect-square size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Logo className="size-4 invert" />
          </div>
          <span className="text-sm font-semibold">Shadcn Form Builder</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search element"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Field Groups */}
        {Object.entries(fieldGroups).map(([groupName, fieldNames]) => {
          const groupFields = filteredFields.filter((field) =>
            fieldNames.includes(field.name)
          )

          if (groupFields.length === 0) return null

          return (
            <SidebarGroup key={groupName} className="mb-6">
              <SidebarGroupLabel className="mb-3 text-xs font-medium text-muted-foreground">
                {groupName}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="grid grid-cols-2 gap-3">
                  {groupFields.map((field) => (
                    <button
                      key={field.name}
                      onClick={() => handleFieldClick(field)}
                      className="flex min-h-[80px] flex-col items-center justify-center rounded-lg border bg-card p-4 text-center transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <field.Icon className="mb-2 h-6 w-6" />
                      <span className="text-xs font-medium leading-tight">
                        {field.name}
                      </span>
                    </button>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}

        {/* Show any remaining fields that don't fit in categories */}
        {(() => {
          const categorizedFieldNames = Object.values(fieldGroups).flat()
          const uncategorizedFields = filteredFields.filter(
            (field) => !categorizedFieldNames.includes(field.name)
          )

          if (uncategorizedFields.length === 0) return null

          return (
            <SidebarGroup>
              <SidebarGroupLabel className="mb-3 text-xs font-medium text-muted-foreground">
                OTHER ELEMENTS
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="grid grid-cols-2 gap-3">
                  {uncategorizedFields.map((field) => (
                    <button
                      key={field.name}
                      onClick={() => handleFieldClick(field)}
                      className="flex min-h-[80px] flex-col items-center justify-center rounded-lg border bg-card p-4 text-center transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <field.Icon className="mb-2 h-6 w-6" />
                      <span className="text-xs font-medium leading-tight">
                        {field.name}
                      </span>
                    </button>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })()}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
