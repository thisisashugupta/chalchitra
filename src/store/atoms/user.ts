import { atom } from 'recoil'

const userAtom = atom({
    key: 'user-data',
    default: {
        id: 0,
        email: "",
        name: "",
        photo: "",
        tag: "",
        total_subscribers: 0,
        total_videos: 0,
    },
})

export { userAtom }