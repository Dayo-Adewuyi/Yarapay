import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { ICreatePin, IReceiveMoneyFromBank, IReceiveMoneyFromCard, IReceiveMoneyFromWallet, ISendToBankAccount, ISendToWalletAddress, ISendToYaraWallet, ISignUp, ISignin } from './types';

export const yaraApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "https://yarapay.xyz/api"}),
    endpoints: (builder) => ({
        signUpWithEmail: builder.mutation({
            query: (body: ISignUp) => ({
                url: '/auth/signup',
                method: 'POST',
                body: body,
            }),
        }),
        signIn: builder.mutation({
            query: (body : ISignin) => ({
                url: '/auth/signin',
                method: 'POST',
                body: body,
            }),
        }),
        getUser: builder.query({
            query: (body ) => ({
                url: '/auth/currentuser',
                method: 'GET',
                body: body,
            }),
        }),
        createPin: builder.mutation({
            query: (body : ICreatePin) => ({
                url: '/transactions/pin',
                method: 'POST',
                body: body,
            }),
        }),
        receiveMoneyFromWallet: builder.mutation({
            query: (body: IReceiveMoneyFromWallet) => ({
                url: '/transactions/receive/blockchain',
                method: 'POST',
                body: body,
            }),
        }),
        receiveMoneyFromCard: builder.mutation({
            query: (body : IReceiveMoneyFromCard) => ({
                url: '/transactions/receive/card',
                method: 'POST',
                body: body,
            }),
        }),
        receiveMoneyFromBank: builder.mutation({
            query: (body : IReceiveMoneyFromBank) => ({
                url: '/transactions/receive/bankaccount',
                method: 'POST',
                body: body,
            }),
        }),
        getTransactionHistory: builder.query({
            query: () => "/transactions/history",
        }),
        sendToYaraWallet: builder.mutation({
            query: (body : ISendToYaraWallet) => ({
                url: '/transactions/send/wallet',
                method: 'POST',
                body: body,
            }),
        }),
        sendToBankAccount: builder.mutation({
            query: (body : ISendToBankAccount) => ({
                url: '/transactions/send/bankaccount',
                method: 'POST',
                body: body,
            }),
        }),
        sendToWalletAddresss: builder.mutation({
            query: (body: ISendToWalletAddress) => ({
                url: '/transactions/send/address',
                method: 'POST',
                body: body,
            }),
        }),
        getBalance: builder.query({
            query: () =>"/transactions/balance",
        }),
    }),
});

export const {
    useCreatePinMutation,
    useGetUserQuery,
    useGetTransactionHistoryQuery,
    useReceiveMoneyFromWalletMutation,
    useReceiveMoneyFromCardMutation,
    useReceiveMoneyFromBankMutation,
    useSendToYaraWalletMutation,
    useSendToBankAccountMutation,
    useSendToWalletAddresssMutation,
    useGetBalanceQuery,
    useSignUpWithEmailMutation,
    useSignInMutation,
} = yaraApi;