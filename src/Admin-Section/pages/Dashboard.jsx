import axios, { all } from "axios"
import { DollarSign, Shirt, TrendingUp, User, Users } from "lucide-react"
import { useContext, useEffect, useMemo, useState } from "react"
import { AuthContext } from "../../context/AuthenticationContext"
import {  Chart as ChartJS,CategoryScale,  LinearScale,  BarElement,  Title,  Tooltip,  Legend,PointElement, ArcElement} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '/src/styles/orderspage.css'
import api from "../../api/api";

// --- IMPORTANT: Register the Chart.js components you will use ---
ChartJS.register(ArcElement, Tooltip, Legend);



function Dashboard(){

    const [allUser,setAllUser]=useState([])
    const {products}=useContext(AuthContext)



        useEffect(()=>{

        async function getAllUsers() {
            let {data:res}=await api.get("/users")
            setAllUser(res)
            console.log( "getting all users",)

        }

        getAllUsers()

    },[])

    const allOrders=allUser.flatMap(user=>user.order)
    const deliveredOrders=allOrders.filter(items=>items.delivery==="Delivered")
    const totalRevenue=deliveredOrders.reduce((sum,item)=> sum+item.price,0)
    const estimatedProfit=totalRevenue*0.4
    
    const deliveredFilter=deliveredOrders.flatMap(item=>item.products.map(product=>product.league))
     const categoryCounts=deliveredFilter.reduce((acc,league)=>{  acc[league]=(acc[league] || 0) + 1
      return acc },{})

      const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        const { top, left, width, height } = chart.chartArea;
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const totalSales = chart.data.datasets[0].data.reduce((sum, value) => sum + value, 0);

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw "Total Sales" text
        ctx.font = '16px sans-serif';
        ctx.fillStyle = '#6B7280'; // Gray color
        ctx.fillText('Total Sales', centerX, centerY + 15);

        // Draw the total number
        ctx.font = 'bold 36px sans-serif';
        ctx.fillStyle = '#1F2937'; // Dark gray color
        ctx.fillText(totalSales, centerX, centerY - 10);
        
        ctx.restore();
    }
};



const chartData = useMemo(() => ({
        labels: Object.keys(categoryCounts),
        datasets: [
            {
                label: '# of Sales',
                data: Object.values(categoryCounts),
                backgroundColor: [
                    'rgba(79, 169, 65, 0.8)',
                    'rgba(255, 0, 0, 0.8)',
                    'rgba(93, 57, 226, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
                hoverBackgroundColor: [
                   'rgba(46, 128, 33, 0.8)',
                    'rgba(224, 15, 15, 0.8)',
                    'rgba(105, 66, 246, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 0,
                hoverBorderWidth: 5,
                cutout: '60%',
            },
        ],
    }), [categoryCounts]);

    // --- 3. Memoize the options object to prevent re-renders from breaking hover effects ---
    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 20,
                    boxWidth: 12,
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Sales by Category',
                font: { size: 18 },
                padding: { bottom: 20 }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw;
                        const percentage = ((value / totalRevenue) * 100).toFixed(1);
                        return `${label}: ${value} sales (${percentage}%)`;
                    }
                }
            }
        },
    }), [totalRevenue]);
    
    

    return ( 
        
     <div>
        <p className="text-3xl font-bold text-gray-800 mb-8 px-15">Welcome back ,Admin !</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-15">

            

    {/* Card 1: Total Revenue */}
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
        <div>
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{`$${totalRevenue.toFixed(2)}`}</p>
        </div>
        <div className="p-4 rounded-full text-white bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
            <DollarSign />
        </div>
    </div>
 {/* Card 2: Estimated Profit */}
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
        <div>
            <p className="text-sm font-medium text-gray-500">Estimated Profit</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{`$${estimatedProfit.toFixed(2)}`}</p>
        </div>
        <div className="p-4 rounded-full text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
            <TrendingUp />
        </div>
    </div>
    {/* Card 3: Total Users */}
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
{/* <div className="bg-white rounded-xl mx-15 w-1/2 cont ">
            <div style={{ height: '400px' }} >
    <h1 className="px-15 font-bold text-2xl pt-4 pb-7 text-center">Products Sold By Category</h1>
                <Doughnut options={chartOptions} data={chartData} plugins={[centerTextPlugin]} />
            </div>
        </div> */}

         <div className="bg-white rounded-xl shadow-lg w-full md:w-1/2 mx-15 cont">
            <h1 className="font-bold text-2xl text-center mb-4 py-5">Products Sold By Category</h1>
            {/* The container is now flexible and the chart will adapt to it */}
            <div className="h-86 py-5">
                <Doughnut options={chartOptions} data={chartData} plugins={[centerTextPlugin]}/>
            </div>
        </div>

</div>
    )

}
export default Dashboard