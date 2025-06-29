import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { addTask } from '@/redux/features/task/taskSlice';
import { useAppDispatch } from '@/redux/hook';
import type { ITask } from '@/types';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';

export default function AddTaskModal() {

    const form = useForm()

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        dispatch(addTask(data as ITask))
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="secondary">Add Task</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="mb-3">
                        <DialogTitle className="text-xl">Add Task</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* input  */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormLabel />
                                        <FormControl>
                                            <Input {...field} value={field.value || ''} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* textarea  */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="mb-2">Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} value={field.value || ''} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* select  */}
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="mb-2">Priority</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a priority to set" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            {/* calender & popover */}
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2">Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={'outline'} className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    // disabled={date => date > new Date() || date < new Date('1900-01-01')}
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit">
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </form>
        </Dialog>
    );
}
