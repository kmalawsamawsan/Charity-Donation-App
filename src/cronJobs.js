const cron = require('node-cron');
const Project = require('./models/Project');

// وظيفة لتحديث إجمالي التبرعات يوميًا
const updateTotalDonations = async () => {
  try {
    const projects = await Project.findAll();
    projects.forEach(async (project) => {
      const donations = await project.getDonations();
      const totalDonations = donations.reduce((sum, donation) => sum + donation.Amount, 0);
      project.RaisedAmount = totalDonations;
      await project.save();
    });
    console.log('Total donations updated successfully');
  } catch (error) {
    console.error('Error updating total donations:', error);
  }
};

// جدولة الوظيفة لتعمل يوميًا عند منتصف الليل
cron.schedule('0 0 * * *', updateTotalDonations);
