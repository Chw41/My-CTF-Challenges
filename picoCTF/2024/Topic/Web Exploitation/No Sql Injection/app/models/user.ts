import mongoose, { Schema, Document, models } from "mongoose";

export interface UserInterface extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: false ,default: "{{Flag}}"},
});
const User = models.User || mongoose.model<UserInterface>("User", UserSchema);

export default User;
