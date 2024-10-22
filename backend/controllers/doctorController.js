import doctorModel from "../models/doctorModel";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);

    // Toggle the availability status
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

    res.json({
      success: true,
      message: 'Availability changed successfully',
    });

  } catch (error) {
    console.error(error);

    // Sending an error response back to the client
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { changeAvailability };
