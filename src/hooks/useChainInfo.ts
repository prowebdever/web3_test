import React, { useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { BigNumber } from 'bignumber.js';
import axios from 'axios';
import { TransactionType } from 'utils/types';

// Define the WebSocket provider for Polkadot API
const polkadotProvider = new WsProvider('wss://westend-rpc.polkadot.io');
const apiKey = 'aa228ed6950c4df6b0322fcf7d7a4a5b';
const apiUrl = `https://westend.api.subscan.io`;

// Hook to get account balance
export const useGetAccountBalance = async (userAddress: string | undefined): Promise<number> => {
  try {
    // Create Polkadot API instance
    const polkadotApi = await ApiPromise.create({ provider: polkadotProvider });

    // Query the account balance from the Polkadot API
    //@ts-ignore
    const { data: { free: balance }} = await polkadotApi.query.system.account(userAddress);

    // Convert balance to a readable format
    let convertedBalance = new BigNumber(balance.toString()).dividedBy(10 ** 12).toNumber().toFixed(3);

    //@ts-ignore
    return Number(convertedBalance);
  } catch (error) {
    console.error('Error fetching account balance:', error);
  }

  return 0;
};

// Hook to get user transactions
export const useGetAccountTransactions = async (userAddress: string | undefined): Promise<TransactionType[]> => {
  let transactionList = [];
  try {
    // Fetch user transactions from the API
    const response = await axios.get(`${apiUrl}/api/scan/transfers`, {
      params: {
        address: userAddress,
        row: 100,
        key: apiKey,
      },
    });

    // Extract transaction data from the response
    const transactionData = response.data.data.transfers;

    if (transactionData?.length > 0) {
      // Map transaction data to desired format
      transactionList = transactionData.map((transaction: any) => {
        let tempTransaction: TransactionType = {
          id: transaction.block_num,
          balance: transaction.amount,
          usdBalance: transaction.usd_amount,
          tokenID: 'WND',
          status: transaction.success ? 'Confirmed' : 'Cancelled',
          action: transaction.to.toLowerCase() === userAddress.toLowerCase() ? 'Received' : 'Sent',
          time: transaction.block_timestamp.toString(),
          from: transaction.from,
          to: transaction.to,
          nounce: transaction.nonce,
          netFee: transaction.fee / Math.pow(10, 12),
          extrinsicIdx: transaction.extrinsic_index,
        };
        return tempTransaction;
      });
    }
  } catch (error) {
    console.error('Error fetching user transactions:', error);
  }
  
  return transactionList;
};
