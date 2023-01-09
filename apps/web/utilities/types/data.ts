export interface ETHDeposit {
  blockCreatedAt: string;
  destAddr: string;
  msgData: string;
  senderAliased: string;
  transactionHash: string;
  value: string;
}

export type ETHDeposits = ETHDeposit[];
