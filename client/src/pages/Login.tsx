"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:3000/auth/login", form)
      const { role, token } = response.data

      if (role) {
        localStorage.setItem("token", token)
        localStorage.setItem("role", role)

        navigate(role === "patient" ? "/patient-dashboard" : "/insurer-dashboard")
      } else {
        alert("Invalid login response. No role found.")
      }
    } catch (error) {
      console.error("Login failed", error)
      alert("Invalid email or password. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to Your Account</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/patient-register")}
                className="w-full"
              >
                Register as Patient
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/insurer-register")}
                className="w-full"
              >
                Register as Insurer
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login