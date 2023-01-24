import * as mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    tgId: { 
        type: Number, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});


interface IUser {
    tgId: number;
    password: string;
}

interface userDoc extends mongoose.Document {
  tgId: number,
  password: string
}

interface userInterface extends mongoose.Model<userDoc>{
    build(attr: IUser): userDoc
}

// make ts aware of object that must be passed into model instance
userSchema.statics.build = (attr: IUser) => {
    return new User(attr)
}

export const User = mongoose.model<userDoc, userInterface>('User', userSchema);

// User.build({
//     tgId: 223,
//     password: "ewrfe"
// })
