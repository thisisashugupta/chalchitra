import React from 'react';
import {
  RecoilRoot,
  atom,
//   selector,
//   useRecoilState,
//   useRecoilValue,
} from 'recoil';

export default function RecoilProvider ({children} : {children: React.ReactNode}) {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  );
}

export const videoState = atom({
    key: 'videoState', // unique ID (with respect to other atoms/selectors)
    default: '3c848853d251ac87dee5d8906516ea8c', // default value (aka initial value)
});