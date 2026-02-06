import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

interface RequireAdminProps {
    children: React.ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/" />; // Not an admin

    return <>{children}</>;
}
