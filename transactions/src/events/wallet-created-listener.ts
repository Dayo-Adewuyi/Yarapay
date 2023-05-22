import { Message } from "node-nats-streaming";
import {
  Listener,
  WalletCreatedEvent,
  Subjects,
} from "@yarapay/tools";
import { queueGroupName } from "./queue-group-name";
import { Wallet } from "../models/wallet";

export class WalletCreatedListener extends Listener<WalletCreatedEvent> {
    subject: Subjects.WalletCreated = Subjects.WalletCreated;
    queueGroupName = queueGroupName;
    
    async onMessage(data: WalletCreatedEvent["data"], msg: Message) {
        const { userId, walletId, ethaddress, polygonaddress } = data;
    
        const wallet = Wallet.build({
        userId,
        walletId,
        ethaddress,
        polygonaddress,
        });
        await wallet.save();
    
        msg.ack();
    }
    }