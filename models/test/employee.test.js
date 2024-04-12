const Employee = require("../employee.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Employee", () => {
  it('should throw an error if no "firstName", "lastName", "department" arg', async () => {
    const cases = [
      {},
      { firstName: "Anna" },
      { lastName: "Black", department: "IT" },
    ];
    for (let testCase of cases) {
      const employee = new Employee({ testCase }); // create new Employee, but don't set any attr value

      employee.validateSync((err) => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should throw an error if "firstName", "lastName", "department" is not a string', () => {
    const cases = [
      { firstName: 123, lastName: true, department: "IT" },
      { firstName: "", lastName: "Black", department: 23.98 },
    ];
    for (let testCase of cases) {
      const employee = new Employee(testCase);

      employee.validateSync((err) => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should not throw an error if "firstName", "lastName", "department" is okay', () => {
    const cases = [
      { firstName: "John", lastName: "Smith", department: "IT" },
      { firstName: "Ana", lastName: "Black", department: "Management" },
    ];
    for (let testCase of cases) {
      const employee = new Employee(testCase);

      employee.validateSync((err) => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
        expect(err.errors.department).to.exist;
      });
    }
  });
});

after(() => {
  mongoose.models = {};
});
