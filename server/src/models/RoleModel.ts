import { Schema, model, Document, Types } from "mongoose";

export interface IRole extends Document {
    name: string;
    description: string;
    permissions?: Types.ObjectId[]; //array of permission IDs
}

const roleSchema = new Schema<IRole>({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    permissions:[{
        type: Schema.Types.ObjectId,
        ref: "Permission"
    }]
},{
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            const {_id, __v, ...rest} = ret;
            return {
                id: _id,
                ...rest
            }
        }
    }
})

const RoleModel = model<IRole>("Role", roleSchema);
export default RoleModel;