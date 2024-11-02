import { Schema, model } from 'mongoose';

export const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    avgMark: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false,
    },
    photo: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true, versionKey: false },
);

export const StudentsCollection = model('students', studentSchema);
