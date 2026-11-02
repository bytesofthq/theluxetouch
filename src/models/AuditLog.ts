import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditLog extends Document {
  adminUser: string;
  action: string;
  targetCollection: string;
  targetId: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const AuditLogSchema: Schema<IAuditLog> = new Schema(
  {
    adminUser: { type: String, required: true },
    action: { type: String, required: true },
    targetCollection: { type: String, required: true },
    targetId: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);

