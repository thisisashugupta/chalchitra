import { atom } from 'recoil';

const subscribeAtom = atom({
    key: 'channel-subscribe',
    default: {
        subscribers: 0,
        subscribed: false,
    },
});

export { subscribeAtom }