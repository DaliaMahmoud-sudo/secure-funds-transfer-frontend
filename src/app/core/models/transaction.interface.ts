export interface Transaction {

  id: number;
  senderAccountNumber: string;
  recipientAccountNumber: string;
  amount: number;
  type: string;
  transactionDate: string;

}
