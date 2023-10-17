import mongoose, { Schema, model } from 'mongoose';
import Payment from '../../Interfaces/Payment/Payment';
import PaymentStatus from '../../enums/PaymentStatus';

const paymentSchema = new Schema<Payment>(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: PaymentStatus,
      default: PaymentStatus.Pending,
      require: true,
    },
    card: {
      number: { type: String, minLength: 14, maxLength: 14, required: true },
      csv: { type: String, minlength: 3, maxlength: 3, required: true },
      expires: { type: Date, required: true },
    },
  },
  { timestamps: true }
);

export default model('Payment', paymentSchema);
