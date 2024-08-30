// routes/catererRoute.js
const express = require('express');
const { registerUser, loginUser, addDish, getDishesByCategory, createMenu, 
    getMenu, getCaterers,createOrder,getOrders,acceptOrder, rejectOrder, 
    orderStatus,getProfile,updateProfile,getOrderDetailsByUserId,dashboardData, 
    caterer } = require('../controllers/catererControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/caterer/:id', protect,caterer);
router.post('/dishes/add', addDish); // Route to add a dish
router.get('/dishes/:email/category/:category', getDishesByCategory);
router.post('/menu', createMenu);
router.get('/menu/:id', getMenu); // Route to get dishes by category
router.get('/caterers', getCaterers);
router.post('/orders', createOrder);
router.get('/orders/:id', getOrders);
router.post('/orders/accept/:id',acceptOrder);
router.delete('/orders/reject/:id', rejectOrder);
router.put('/orders/status/:id',orderStatus);
router.get('/profile/:userId',getProfile);
router.put('/profile/:userId',updateProfile);
router.get('/userorders/:id', getOrderDetailsByUserId);
router.get('/dashboard-data/:userId', dashboardData);

module.exports = router;
