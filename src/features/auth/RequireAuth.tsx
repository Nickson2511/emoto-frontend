import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

interface RequireAuthProps {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const user = useSelector((state: RootState) => state.auth.user);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}






// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../../app/store';

// interface RequireAuthProps {
//     children: React.ReactNode;
// }

// export default function RequireAuth({ children }: RequireAuthProps) {
//     const user = useSelector((state: RootState) => state.auth.user);

//     if (!user) return <Navigate to="/login" />;

//     return <>{children}</>;
// }
