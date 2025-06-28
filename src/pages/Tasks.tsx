import TaskCard from "@/components/module/tasks/taskCard";
import { selectTasks } from "@/redux/features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";


export default function Tasks() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);


  console.log(tasks)


  return (
    <div className="mx-auto max-w-7xl px-5 mt-20">
      <div>
        <h1>Tasks</h1>
      </div>
      <div className="space-y-5 mt-5">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  )
}
