import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface PublicGuardProps {
    children: ReactNode;
}

export const PublicGuard: FC<PublicGuardProps> = ({ children }) => {
    return <>{children}</>;
};

PublicGuard.propTypes = {
    children: PropTypes.node.isRequired,
};
