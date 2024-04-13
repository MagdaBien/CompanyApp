const Employee = require("../employee.model");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Employee", () => {
  before(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/companyDBtest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  // ------------------- READING DATA -----------------------------------------
  describe("Reading data", () => {
    before(async () => {
      const testEmplOne = new Employee({
        firstName: "Ana",
        lastName: "Black",
        department: "65f758dd25e4bff412f532cb",
      });
      await testEmplOne.save();

      const testEmplTwo = new Employee({
        firstName: "Joe",
        lastName: "Red",
        department: "65f758dd25e4bff412f532ct",
      });
      await testEmplTwo.save();
    });

    it("should return all the data with find method", async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it("should return proper document by various params with findOne method", async () => {
      const employee = await Employee.findOne({
        firstName: "Ana",
        lastName: "Black",
        department: "65f758dd25e4bff412f532cb",
      });
      const expectedFirstName = "Ana";
      const expectedLastName = "Black";
      const expectedDepartment = "65f758dd25e4bff412f532cb";
      expect(employee.firstName).to.be.equal(expectedFirstName);
      expect(employee.lastName).to.be.equal(expectedLastName);
      expect(employee.department).to.be.equal(expectedDepartment);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  // ------------------- CREATING DATA -----------------------------------------
  describe("Creating data", () => {
    it("should insert new document with insertOne method", async () => {
      const employee = new Employee({
        firstName: "Ana",
        lastName: "Black",
        department: "65f758dd25e4bff412f532cb",
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  // ------------------- UPDATING DATA -----------------------------------------
  describe("Updating data", () => {
    beforeEach(async () => {
      const testEmplOne = new Employee({
        firstName: "Ana",
        lastName: "Black",
        department: "65f758dd25e4bff412f532cb",
      });
      await testEmplOne.save();

      const testEmplTwo = new Employee({
        firstName: "Joe",
        lastName: "Red",
        department: "65f758dd25e4bff412f532ct",
      });
      await testEmplTwo.save();
    });

    it("should properly update one document with updateOne method", async () => {
      await Employee.updateOne(
        { firstName: "Ana", lastName: "Black" },
        { $set: { firstName: "Anna", lastName: "Czarny" } }
      );
      const updatedEmployee = await Employee.findOne({
        firstName: "Anna",
        lastName: "Czarny",
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it("should properly update one document with save method", async () => {
      const employee = await Employee.findOne({
        firstName: "Ana",
        lastName: "Black",
      });
      employee.firstName = "Anna";
      employee.lastName = "Czarny";
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: "Anna",
        lastName: "Czarny",
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it("should properly update multiple documents with updateMany method", async () => {
      await Employee.updateMany(
        {},
        { $set: { firstName: "Anna", lastName: "Czarny" } }
      );
      const Employees = await Employee.find({
        firstName: "Anna",
        lastName: "Czarny",
      });
      expect(Employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  // ------------------- REMOVING DATA -----------------------------------------
  describe("Removing data", () => {
    beforeEach(async () => {
      const testEmplOne = new Employee({
        firstName: "Ana",
        lastName: "Black",
        department: "65f758dd25e4bff412f532cb",
      });
      await testEmplOne.save();

      const testEmplTwo = new Employee({
        firstName: "Joe",
        lastName: "Red",
        department: "65f758dd25e4bff412f532ct",
      });
      await testEmplTwo.save();
    });

    it("should properly remove one document with deleteOne method", async () => {
      await Employee.deleteOne({ firstName: "Ana", lastName: "Black" });
      const removeEmployee = await Employee.findOne({
        firstName: "Ana",
        lastName: "Black",
      });
      expect(removeEmployee).to.be.null;
    });

    it("should properly remove multiple documents with deleteMany method", async () => {
      await Employee.deleteMany();
      const Employees = await Employee.find();
      expect(Employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});
