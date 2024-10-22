import doctorModel from "../models/doctorModel.js";

const changeAvailability = async (req, res) => {
  try {
    
    const { docId } = req.body;

    // Check if docId is passed correctly
    if (!docId) {
      return res.json({
        success: false,
        message: 'Doctor ID is required',
      });
    }

    const docData = await doctorModel.findById(docId);

    // Check if the doctor exists
    if (!docData) {
      return res.json({
        success: false,
        message: 'Doctor not found',
      });
    }

    // Toggle the availability status
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

    return res.json({
      success: true,
      message: 'Availability changed successfully',
    });

  } catch (error) {
    console.error('Error changing availability:', error);

    return res.json({
      success: false,
      message: 'An error occurred while changing availability',
      error: error.message,
    });
  }
};

export { changeAvailability };
