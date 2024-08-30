import React, { useState, useEffect } from 'react';
import './Home.css';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, LineElement, BarElement, CategoryScale, LinearScale, PointElement, ArcElement } from 'chart.js';
import axios from '../../axiosConfig';

Chart.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, ArcElement);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    dailyRevenue: [],
    topProducts: [],
    revenueBreakdown: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId'); // Get user ID from local storage
      try {
        const response = await axios.get(`/dashboard-data/${userId}`);
        setDashboardData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Data for Line Chart (Daily Revenue)
  const lineData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Daily Revenue',
        data: Array.isArray(dashboardData.dailyRevenue) ? dashboardData.dailyRevenue.map((rev) => rev.total) : [],
        borderColor: '#ff4500',
        backgroundColor: 'rgba(255, 69, 0, 0.2)',
        fill: true,
      },
    ],
  };

  // Data for Bar Chart (Top Products)
  const barData = {
    labels: Array.isArray(dashboardData.topProducts) ? dashboardData.topProducts.map((product) => product.name) : [],
    datasets: [
      {
        label: 'Top Selling Products',
        data: Array.isArray(dashboardData.topProducts) ? dashboardData.topProducts.map((product) => product.sales) : [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for Pie Chart (Revenue Breakdown)
  const pieData = {
    labels: Array.isArray(dashboardData.revenueBreakdown) ? dashboardData.revenueBreakdown.map((category) => category.name) : [],
    datasets: [
      {
        label: 'Revenue Breakdown',
        data: Array.isArray(dashboardData.revenueBreakdown) ? dashboardData.revenueBreakdown.map((category) => category.total) : [],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#2ecc71', '#f1c40f'],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-page">
      <div className="cards">
        <div className="card">
          <h3>Number of Orders</h3>
          <p>{dashboardData.totalOrders}</p>
        </div>
        <div className="card">
          <h3>Revenue</h3>
          <p>Rs. {dashboardData.totalRevenue}</p>
        </div>
        <div className="card">
          <h3>Total Customers</h3>
          <p>{dashboardData.totalCustomers}</p>
        </div>
      </div>

      <div className="graphs">
        <div className="graph">
          {dashboardData.dailyRevenue && dashboardData.dailyRevenue.length > 0 ? (
            <Line data={lineData} options={options} />
          ) : (
            <p>No daily revenue data available</p>
          )}
        </div>

        <div className="graph">
          {dashboardData.topProducts && dashboardData.topProducts.length > 0 ? (
            <Bar data={barData} options={options} />
          ) : (
            <p>No top products data available</p>
          )}
        </div>

        <div className="graph">
          {dashboardData.revenueBreakdown && dashboardData.revenueBreakdown.length > 0 ? (
            <Pie data={pieData} />
          ) : (
            <p>No revenue breakdown data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
