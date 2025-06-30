import { Button } from '@/components/ui/button';
import { removeUser } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
import type { IUser } from '@/types';

import { Trash2 } from 'lucide-react';

interface IProps {
    user: IUser;
}

export default function UserCard({ user }: IProps) {
    const dispatch = useAppDispatch();

    return (
        <div className="border px-5 py-3 rounded-md">
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center justify-between w-full md:w-[253px]">
                    <div>{user.name}</div>
                    <Button onClick={() => dispatch(removeUser(user.id))} variant="link" className="p-0 text-red-500">
                        <Trash2 />
                    </Button>
                </div>
            </div>
        </div>
    );
}
