import { Schema, model, Document } from "mongoose";

export interface IPermission extends Document {
    name: string;
    description: string;
}
const permissionSchema = new Schema<IPermission>({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            const { _id, __v, ...rest} = ret;
            return {
                id: _id,
                ...rest
            }
        }
    }
})

const PermissionModel = model<IPermission>("Permission", permissionSchema);
export default PermissionModel;