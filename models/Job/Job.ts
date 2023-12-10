import { Schema, model } from 'mongoose';
import Job from '../../Interfaces/Job/Job';

const jobSchema = new Schema<Job>({}, { timestamps: true });

export default model('Job', jobSchema);
