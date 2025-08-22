"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, DollarSign, ShoppingBag } from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const lineData = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 600 },
  { name: "Apr", sales: 800 },
  { name: "May", sales: 700 },
  { name: "Jun", sales: 1000 },
];

const pieData = [
  { name: "Monitor", value: 400 },
  { name: "Speaker", value: 300 },
  { name: "Mouse", value: 300 },
  { name: "Keyboard", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DashboardPage() {
  return (
    <div className=" min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard Overview</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Users</CardTitle>
            <Users className="w-6 h-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12,340</p>
            <p className="text-green-500 flex items-center gap-1 text-sm">
              <ArrowUpRight className="w-4 h-4" /> +12%
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Revenue</CardTitle>
            <DollarSign className="w-6 h-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$45,210</p>
            <p className="text-red-500 flex items-center gap-1 text-sm">
              <ArrowDownRight className="w-4 h-4" /> -5%
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Orders</CardTitle>
            <ShoppingBag className="w-6 h-6 text-purple-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,250</p>
            <p className="text-green-500 flex items-center gap-1 text-sm">
              <ArrowUpRight className="w-4 h-4" /> +8%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
