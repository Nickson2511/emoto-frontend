import { useAppSelector } from "../../hooks";

const AccountProfile = () => {

    const user = useAppSelector(
        (state) => state.auth.user
    );

    return (
        <div>

            <h1 className="text-lg sm:text-xl font-semibold mb-6">
                Profile
            </h1>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border space-y-4 max-w-xl">

                <p className="text-sm sm:text-base">
                    <strong>Name:</strong> {user?.name}
                </p>

                <p className="text-sm sm:text-base">
                    <strong>Email:</strong> {user?.email}
                </p>

                <p className="text-sm sm:text-base">
                    <strong>Role:</strong> {user?.role}
                </p>

            </div>

        </div>
    );
};

export default AccountProfile;