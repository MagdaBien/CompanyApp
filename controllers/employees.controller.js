const Employee = require("../models/employee.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate("department"));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().populate("department").skip(rand);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id).populate("department");
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
      department: department,
    });
    await newEmployee.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const dep = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          department: department,
        },
      },
      { returnDocument: "after" }
    );
    if (dep) {
      res.json(dep);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const dep = await Employee.findOneAndDelete({ _id: req.params.id });
    if (dep) {
      res.json(dep);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
