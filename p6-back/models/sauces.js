import mongoose from "mongoose";

const sauceSchema = mongoose.Schema( {
    userId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    manufacturer: {
        type: String
    },
    description: {
        type: String,
        require: true
    },
    mainPepper: {
        type: String
    },
    imageName: {
        type: String,
        require: true
    },
    heat: {
        type: Number
    },
    usersLiked: {
        type: [String]
    },
    usersDIsliked: {
        type: [String]
    }
} );

export default mongoose.model('sauce', sauceSchema);