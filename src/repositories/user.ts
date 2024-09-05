import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

export const UserSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);

export const findUser = async (email: string) => {
    return await User.findOne({ email });
};

export const createUser = async (user: IUser) => {
    return await User.create(user);
};

export const updateUser = async (user: IUser) => {
    return await User.findOneAndUpdate({ _id: user._id }, user, { new: true });
};

export const deleteUser = async (id: string) => {
    return await User.deleteOne({ _id: id });
};
