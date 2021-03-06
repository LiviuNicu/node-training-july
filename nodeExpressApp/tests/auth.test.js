const userModel = require("../models/userModel").User;
const userModelFunctions = require("../models/userModel");

const mongoose = require("mongoose");

describe("User model test", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://liviu:liviu@fmi.petdf.mongodb.net/jest?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
      }
    );
  });
  test("test", async () => {
    expect(true).toBe(true);
  });

  test("User is inserted successfully in the database", async () => {
    const user = {
      email: "test_" + new Date().getTime() + "@test.com",
      firstName: "test user",
      lastName: "last name user",
      hashed_password: "testpassword",
    };

    const validUser = new userModel(user);
    let insertedUser = await validUser.save();

    expect(insertedUser._id).toBeDefined();
    expect(insertedUser.dateAdded).toBeDefined();
    expect(insertedUser.firstName).toBe(user.firstName);
    expect(insertedUser.lastName).toBe(user.lastName);
    expect(insertedUser.email).toBe(user.email);
    expect(insertedUser.hashed_password).toBe(user.hashed_password);
  });

  test("is email required in the database?", async () => {
    const user = {
      email: "",
      firstName: "test user",
      lastName: "last name user",
      hashed_password: "testpassword",
    };
    const invalidUser = new userModel(user);

    let err;

    try {
      await invalidUser.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });

  test("is register function work as expected?", async () => {
    const user = {
      email: "test_" + new Date().getTime() + "@test.com",
      firstName: "test user",
      lastName: "last name user",
      password: "testpassword",
    };

    let insertedUser = await userModelFunctions.register(user);

    expect(insertedUser.success).toBe("User inserted");
    expect(insertedUser.user._id).toBeDefined();
    expect(insertedUser.user.dateAdded).toBeDefined();
    expect(insertedUser.user.firstName).toBe(user.firstName);
    expect(insertedUser.user.lastName).toBe(user.lastName);
    expect(insertedUser.user.hashed_password).toBeDefined();
    expect(insertedUser.user.email).toBe(user.email);
  });

  test("is login working as expected?", async () => {
    const user = {
      email: "test_" + new Date().getTime() + "@test.com",
      firstName: "test user",
      lastName: "last name user",
      password: "testpassword",
    };
    await userModelFunctions.register(user);

    const loginResponse = await userModelFunctions.login({
      email: user.email,
      password: user.password,
    });
    expect(loginResponse.token).toBeDefined();
  });
});
