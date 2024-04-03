import User from "../models/user";


export const seedUsers = async (): Promise<void> => {
  
  try {

     const users = await User.find({email: "joshiriya355@mumbama.com"});
      if (users.length > 0) {
        return;
      }
    const newUser = new User({
      firstName: "Josh",
      lastName: "Iriya",
      email: "joshiriya355@mumbama.com",
      password: process.env.NEXT_PUBLIC_PASSWORD as string
    });
    await newUser.save();
  } catch (error) {
    throw new Error("Some thing went wrong")
  }
};


