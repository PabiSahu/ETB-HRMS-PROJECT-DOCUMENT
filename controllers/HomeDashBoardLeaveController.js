const database = require('../models/LeaveDashBoardModal');

async function getLeaveData(req, res) {
  const { timePeriod } = req.query;
  let startDate, endDate;

  // Determine the start and end dates based on the selected time period
  switch (timePeriod) {
    case 'currentWeek':
      startDate = 'CURDATE() - INTERVAL 7 DAY';
      endDate = 'CURDATE()';
      break;
    case 'lastWeek':
      startDate = 'CURDATE() - INTERVAL 14 DAY';
      endDate = 'CURDATE() - INTERVAL 7 DAY';
      break;
    case 'nextWeek':
      startDate = 'CURDATE() + INTERVAL 7 DAY';
      endDate = 'CURDATE() + INTERVAL 14 DAY';
      break;
    default:
      // Handle invalid time periods
      res.status(400).json({ error: 'Invalid time period' });
      return;
  }

  const leaveQuery = `
    SELECT EMPLOYEE_NAME, SUM(DAYS_OF_LEAVE) AS totalDays
    FROM ETB_HR_EMPLOYEE_LEAVE_APPROVAL
    WHERE LEAVE_FROM_DATE >= ${startDate} AND LEAVE_FROM_DATE < ${endDate}
    GROUP BY EMPLOYEE_NAME;
  `;

  try {
    const leaveResults = await database.executeQuery(leaveQuery);
    res.json(leaveResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getLeaveData,
};
