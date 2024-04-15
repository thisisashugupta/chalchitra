"use client"

import React from 'react';
import {
  RecoilRoot,
  atom,
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
    default: '', // default value (aka initial value)
});