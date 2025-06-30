import AddUserModal from '@/components/module/users/AddUserModal';
import UserCard from '@/components/module/users/userCard';
import { selectUsers } from '@/redux/features/user/userSlice';
import { useAppSelector } from '@/redux/hook';

export default function Users() {

    const users = useAppSelector(selectUsers);

    console.log(users);

    return (
        <div className="mx-auto max-w-7xl px-5 mt-20">
            <div className="flex justify-end gap-5 items-center">
                <h1 className="mb-4 text-lg mr-auto">Users</h1>
                <AddUserModal />
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-5">
                {users.map(user => (
                    <UserCard user={user} key={user.id} />
                ))}
            </div>
        </div>
    );
}
