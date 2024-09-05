import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    images: string[];
    price: number;
    category: string;
    user: mongoose.Schema.Types.ObjectId;
}

export const ProductSchema = new mongoose.Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);

export async function findProduct(id: string) {
    return await Product.findOne({ _id: id });
}

export async function createProduct(product: IProduct) {
    return await Product.create(product);
}

export async function updateProduct(product: IProduct) {
    return await Product.findOneAndUpdate({ _id: product._id }, product, { new: true });
}

export async function deleteProduct(id: string) {
    return await Product.deleteOne({ _id: id });
}
