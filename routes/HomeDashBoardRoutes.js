// // routes/routes.js
// const express = require('express');
// const HomeDashBoardController = require('../controllers/HomeDashBoardController');

// const router = express.Router();

// router.get('/home', HomeDashBoardController.getEmployeeData);

// module.exports = router;


// routes/dashboardRoutes.js
const express = require('express');
const dashboardController = require('../controllers/HomeDashBoardController');

const router = express.Router();
const employeeDetailsMiddleware = require('../employeeDetailsMiddleware');
// Endpoint to fetch leave data based on time period
router.get('/leaveData',employeeDetailsMiddleware , dashboardController.getLeaveData);

router.get('/leaveTodayData',employeeDetailsMiddleware , dashboardController.getAbsentEmployees);

// Endpoint to render the home page with employee data
router.get('/home',employeeDetailsMiddleware , dashboardController.getEmployeeData);

router.get('/data',employeeDetailsMiddleware , dashboardController.getTimecard);

module.exports = router;
