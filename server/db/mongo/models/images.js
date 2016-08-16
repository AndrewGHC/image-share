import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    user: String,
    image: {
        data: String,
        mimeType: String
    },
    title: String
});

export default mongoose.model('Image', UserSchema);
