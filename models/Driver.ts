import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    backupPhone: {
        type: String,
    },
},
    {
        timestamps: true
    }
)

const Driver = mongoose.models.Driver || mongoose.model('Driver', DriverSchema);
export default Driver;