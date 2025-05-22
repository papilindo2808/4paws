"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Toast } from "../components/ui/toast"

// Define the form schema with validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
})

// This type represents the shape of form values
type FormValues = z.infer<typeof formSchema>

// This would typically come from your API or server action
async function createRescueGroup(data: FormValues) {
  // This is a placeholder for the actual API call
  // In a real application, you would call your API endpoint here
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Creating rescue group:", data)
      resolve({ success: true, id: Math.floor(Math.random() * 1000) })
    }, 1000)
  })
}

export function CreateRescueGroupForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
    },
  })

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    try {
      const result = await createRescueGroup(data)
      Toast({
        title: "Rescue group created",
        description: "Your rescue group has been created successfully.",
      })
      navigate("/rescue-groups") // Redirect to the rescue groups list
    } catch (error) {
    Toast({
        title: "Error",
        description: "There was an error creating the rescue group.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Rescue Group Information</CardTitle>
        <CardDescription>Enter the details for the new rescue group. All fields are required.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter rescue group name" {...field} />
                  </FormControl>
                  <FormDescription>The name of your rescue group as it will appear to others.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the mission and purpose of your rescue group"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about your rescue group's mission, activities, and goals.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State or Region" {...field} />
                  </FormControl>
                  <FormDescription>The primary location where your rescue group operates.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => navigate("/rescue-groups")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Rescue Group"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
    </div>
  )
}
