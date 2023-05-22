import {Publisher, Subjects, WalletCreatedEvent} from '@yarapay/tools';

export class WalletCreatedPublisher extends Publisher<WalletCreatedEvent> {
    readonly subject = Subjects.WalletCreated;
}

