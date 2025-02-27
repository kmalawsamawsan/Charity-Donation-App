const pool = require('../db'); // استيراد الاتصال بقاعدة البيانات

const getAllData = async () => {
  try {
    const donors = await pool.query('SELECT * FROM Donors');
    const projects = await pool.query('SELECT * FROM Projects');
    const donations = await pool.query('SELECT * FROM Donations');

    console.log('Donors:', donors.rows);
    console.log('Projects:', projects.rows);
    console.log('Donations:', donations.rows);
  } catch (err) {
    console.error(err);
  }
};

getAllData();
