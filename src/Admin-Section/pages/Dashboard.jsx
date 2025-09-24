import axios from "axios";
import { DollarSign, Shirt, TrendingUp, Users } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthenticationContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "/src/styles/orderspage.css";
import api from "../../api/api";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
   const [allUser, setAllUser] = useState([]);
  const { products } = useContext(AuthContext);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const { data: res } = await api.get("/users");
        setAllUser(res);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    getAllUsers();
  }, []);

  const allOrders = useMemo(() => allUser.flatMap((user) => user.order), [allUser]);
  const deliveredOrders = useMemo(() => allOrders.filter((items) => items?.delivery === "Delivered"), [allOrders]);
  const totalRevenue = useMemo(() => deliveredOrders.reduce((sum, item) => sum + item.price, 0), [deliveredOrders]);
  const estimatedProfit = totalRevenue * 0.4;

  // Data for charts
  const categoryCounts = useMemo(() => {
      const deliveredFilter = deliveredOrders.flatMap((item) =>
        item.products.map((product) => product.league)
      );
      return deliveredFilter.reduce((acc, league) => {
          acc[league] = (acc[league] || 0) + 1;
          return acc;
      }, {});
  }, [deliveredOrders]);


  // Time-based sales data for the Line Chart
  const timeSalesData = useMemo(() => {
    const salesByDate = deliveredOrders.reduce((acc, order) => {
      if (!order.date) return acc;
      // Convert date string to a reliable format (YYYY-MM-DD) for sorting and grouping
      const dateObj = new Date(order.date.replace(/,/g, ''));
      const dateKey = dateObj.toISOString().split('T')[0];
      
      acc[dateKey] = (acc[dateKey] || 0) + order.price;
      return acc;
    }, {});

    const sortedDates = Object.keys(salesByDate).sort();
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.7)");
    gradient.addColorStop(1, "rgba(59, 130, 246, 0.1)");

    return {
      labels: sortedDates.map(date => new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' })),
      datasets: [
        {
          label: "Daily Revenue",
          data: sortedDates.map((date) => salesByDate[date]),
          borderColor: "#3B82F6",
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#3B82F6",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#3B82F6",
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBorderWidth: 2,
        },
      ],
    };
  }, [deliveredOrders]);

  // Options for the Line Chart
    const timeSalesOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: 'end',
        labels: {
          boxWidth: 12,
          font: { size: 14, family: "Inter, sans-serif" },
          color: "#4B5563",
          padding: 20,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const value = context.raw || 0;
            return `Revenue: ${value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
            color: "#6B7280",
             font: { size: 12, family: "Inter, sans-serif" },
        }
      },
      y: {
        beginAtZero: true,
        grid: { 
            color: "#e5e7eb",
            drawBorder: false,
        },
        ticks: {
          color: "#6B7280",
          font: { size: 12, family: "Inter, sans-serif" },
          callback: function(value) {
            if (value >= 1000) return '$' + (value / 1000) + 'k';
            return '$' + value;
          }
        }
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
    interaction: {
        mode: 'index',
        intersect: false,
    },
  }), []);

  // Data for the Bar Chart
  const barChartData = useMemo(
    () => ({
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          label: "# of Sales",
          data: Object.values(categoryCounts),
          backgroundColor: [
            "rgba(11, 54, 162, 0.8)", // International
            "rgba(59, 130, 246, 0.8)",  // Premier League
            "rgba(234, 179, 8, 0.8)",   // Bundesliga
            "rgba(239, 68, 68, 0.8)",   // La Liga
            "rgba(79, 169, 65, 0.8)",   // Serie A
          ],
          borderColor: [
            "rgba(11, 54, 162, 0.8)",
            "rgba(59, 130, 246, 1)",
            "rgba(234, 179, 8, 1)",
            "rgba(239, 68, 68, 1)",
            "rgba(79, 169, 65, 1)",
          ],
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    }),
    [categoryCounts]
  );
  
  // Options for the Bar Chart
  const barChartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // Legend is redundant for this bar chart
        },
        title: {
          display: false, // We have a title in the card header
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || "";
              const value = context.raw;
              return `${label}: ${value}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false, // Hide vertical grid lines
          },
          ticks: {
            color: "#6B7280",
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "#e5e7eb", // Light horizontal grid lines
          },
          ticks: {
            color: "#6B7280",
            precision: 0 // Ensure whole numbers for sales counts
          }
        },
      },
    }),
    []
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <p className="text-3xl font-bold text-gray-800 mb-8">Welcome back, Admin!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{`$${totalRevenue.toFixed(2)}`}</p>
          </div>
          <div className="p-4 rounded-full text-white bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
            <DollarSign />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
          <div>
            <p className="text-sm font-medium text-gray-500">Estimated Profit</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{`$${estimatedProfit.toFixed(2)}`}</p>
          </div>
          <div className="p-4 rounded-full text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
            <TrendingUp />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{allUser.length}</p>
          </div>
          <div className="p-4 rounded-full text-white bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
            <Users />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{products.length}</p>
          </div>
          <div className="p-4 rounded-full text-white bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg">
            <Shirt />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
           <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Over Time</h2>
           <div className="h-96">
                <Line options={timeSalesOptions} data={timeSalesData} />
           </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Sales By Category</h2>
          <div className="h-96">
            <Bar options={barChartOptions} data={barChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;