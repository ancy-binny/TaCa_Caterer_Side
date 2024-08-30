// controllers/catererController.js
const Caterer = require('../models/caterers');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken');
const Menu = require('../models/Menu');
const { default: mongoose } = require('mongoose');
const Order = require('../models/orders');

const registerUser = async (req, res) => {
  try {
    const { serviceName, location, phoneNumber, email, address, password } = req.body;

    // Check if the user already exists
    const existingUser = await Caterer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Caterer({
      serviceName,
      location,
      phoneNumber,
      email,
      address,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    // Find the user by email
    const user = await Caterer.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};

const caterer = async (req, res) => {
  try {
    const user = await Caterer.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const addDish = async (req, res) => {
  try {
    const { email, name, quantity, ingredients, image, category } = req.body;
    

    // Find the user by email
    const user = await Caterer.findOne({ email });
    console.log('req', req.body);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Create the new dish
    const newDish = {
      name,
      quantity,
      ingredients,
      image,
      category
    };

    // Add the new dish to the user's dishes array
    user.dishes.push(newDish);

    // Save the updated user
    await user.save();

    res.status(201).json({ message: 'Dish added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the dish' });
  }
};

const getDishesByCategory = async (req, res) => {
  try {
    const { email, category } = req.params;

    // Find the user by email
    const user = await Caterer.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Filter dishes by category
    const dishes = user.dishes.filter(dish => dish.category === category);

    res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching dishes' });
  }
};

// POST new dish to the menu
const createMenu = async (req, res) => {
  const { category, name, quantity, ingredients, image,catId } = req.body;

  const newDish = {
    name,
    quantity,
    ingredients,
    image
  };

  try {
    // Find the category in the database
    let categoryData = await Menu.findOne({ category });

    if (categoryData) {
      // If category exists, add the new dish to it
      categoryData.dishes.push(newDish);
    } else {
      console.log("No category",req.body)
      // If the category does not exist, create a new one
      categoryData = new Menu({ category, dishes: [newDish], catId });
    }

    const savedCategory = await categoryData.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMenu = async (req, res) => {
  try {
    console.log("Loading");
    const { id } = req.params;
    console.log(id);
    const objectId = new mongoose.Types.ObjectId(id);
    const menu = await Menu.find({ catId:objectId });
    console.log(menu,'kjkjkj') // Fetch menu where catId matches cid
    if (menu.length > 0) {
      res.json(menu);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


getCaterers = async (req, res) => {
  try {
    const caterers = await Caterer.find();
    res.status(200).json(caterers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching caterers', error });
  }
};

createOrder = async (req, res) => {
  try {
    console.log('create order', req.body);
    
    const { userId, catererId, totalAmount, items } = req.body;

    // Validate data (you can add more validations if needed)
    if (!userId || !catererId || !totalAmount || !items) {
      
      
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('fjlkadjklf');
    // Create a new order
    const newOrder = new Order({
      userId,
      catererId,
      totalAmount,
      items
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Send success response
    res.status(201).json({ message: 'Order created successfully', order: savedOrder  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrders = async (req, res) => {
  try {
    console.log('api.getOrders', req.params);
    
    const catererId = req.params.id; // assuming catererId is passed in the request
    const orders = await Order.find({ catererId });
    if (!orders) {
      return res.status(404).json({ message: 'No orders found' });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const acceptOrder = async (req, res) => {
  console.log('order')
  try {
    
    const order = await Order.findById(req.params.id);
    console.log(order,'order')
    if (!order) {
      return res.status(404).send('Order not found');
    }
    order.accepted = true;
    order.status = { packed: false, sent: false, delivered: false, payment: false };
    order.completed = false;
    await order.save();
    res.status(200).send('Order accepted');
  } catch (error) {
    res.status(500).send('Error accepting order:', error);
  }
}

const rejectOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).send('Order rejected and deleted');
  } catch (error) {
    res.status(500).send('Error rejecting order:', error);
  }
}

const orderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    const { packed, sent, delivered, payment } = req.body.status;
    order.status = { packed, sent, delivered, payment };
    order.completed = packed && sent && delivered && payment;
    await order.save();
    res.status(200).send('Order status updated');
  } catch (error) {
    res.status(500).send('Error updating order status:', error);
  }
}

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const caterer = await Caterer.findById(userId); // Fetch by userId

    if (!caterer) {
      return res.status(404).json({ message: 'Caterer not found' });
    }

    res.json(caterer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming you have middleware that sets req.user
    const { serviceName, location, phoneNumber, email, address, ratings } = req.body;

    const updatedCaterer = await Caterer.findByIdAndUpdate(
      userId,
      { serviceName, location, phoneNumber, email, address, ratings },
      { new: true }
    );

    if (!updatedCaterer) {
      return res.status(404).json({ message: 'Caterer not found' });
    }

    res.json(updatedCaterer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const getOrderDetailsByUserId = async (req, res) => {
  const userId = req.params.id;

  console.log(userId,'qqqqqqqqqqqqqq');

  try {
    const orders = await Order.find({ userId: userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const dashboardData = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log(userId,'helloo')
    // Count total orders for the specific caterer
    const totalOrders = await Order.countDocuments({ catererId: userId });
    console.log(totalOrders,'totalOrders');

    // Calculate total revenue for the specific caterer
    const totalRevenue = await Order.aggregate([
      { $match: { catererId: userId } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    // Count total customers (assuming each unique user in the orders collection is a customer)
    const distinctCustomers = await Order.distinct('userId', { catererId: userId });
    const totalCustomers = distinctCustomers.length;

    // Calculate daily revenue for the specific caterer
    const dailyRevenue = await Order.aggregate([
      { $match: { catererId: userId } },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          total: { $sum: '$totalAmount' },
        },
      },
      { $sort: { '_id': 1 } },
    ]);

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0,
      totalCustomers,
      dailyRevenue,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { dashboardData };


module.exports = { 
  registerUser,
  loginUser,
  addDish,
  getDishesByCategory,
  createMenu,
  getMenu,
  getCaterers,
  createOrder,
  getOrders,
  acceptOrder,
  rejectOrder,
  orderStatus,
  getProfile,
  updateProfile,
  getOrderDetailsByUserId,
  dashboardData,
  caterer
};
