import type { FC, ReactNode } from 'react';

import {PublicGuard} from "src/guards/public-guard";
import {GuestGuard} from "../guards/guest-guard";

interface PublicGuardProps {
  children: ReactNode;
}

export const withPublicGuard = <P extends object>(Component: FC<P>): FC<P> => {
  return function WithGuestGuard(props: P) {
    return (
        <PublicGuard>
          <Component {...props} />
        </PublicGuard>
    );
  };
};
