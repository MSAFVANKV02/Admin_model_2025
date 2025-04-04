export interface IBrand {
  _id: string;
  name: string;
  logo: string;
  trademarkNumber: string;
  trademarkCertificate: string;
  certificateOwnerName: string;
  nonObjectiveDocument: string;
  isDeleted: boolean;
  status:IBrandGetStatus;
  statusReason: string;
  createdBy:string;
  createdAt: string;
  updatedAt: string;
}


export type IBrandGetStatus = "approved"|"rejected"|"pending"|""