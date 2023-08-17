
export type TransactionType = {
    id: string,
    balance: number,
    usdBalance: number,
    tokenID: 'DOT' | 'WND',
    status: 'Confirmed' | 'Cancelled' | 'Pending',
    action: 'Received' | "Sent",
    time: string,
    from?: string,
    to?: string,
    nounce?: string,
    netFee?: number,
    extrinsicIdx?: string
}

export type AccountType = {
    address: string,
    seed: string,
    name: string
}

export type ContactType = {
    name: string,
    address: string
}

export type AccountInfoType = {
    account: AccountType,
    balance: number,
    transactions: TransactionType[]
}