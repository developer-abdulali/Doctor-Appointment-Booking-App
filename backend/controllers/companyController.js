import { Company } from "../modals/companyModal.js";

// register a company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    //validate company
    if (!companyName) {
      return res.status(400).json({ msg: "Please provide a company name" });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ success: false, message: "You can't register same company" });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(200).json({
      success: true,
      message: "Company registered successfully",
      company,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while registering the company" });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id

    const companies = await Company.find({ userId });

    if (!companies) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    return res.status(200).json({ success: true, companies });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while getting company" });
  }
};

// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    return res.json({ success: true, company });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while getting company" });
  }
};

// update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // cloudinary here..

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    return res.json({
      success: true,
      message: "Company information updated",
      company,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while updating company" });
  }
};
