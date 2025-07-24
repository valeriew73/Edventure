"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Inputs = Omit<UserMetadata, "userId" | "createdAt" | "updatedAt">;

interface UserFormProps {
    onSubmit?: SubmitHandler<Inputs>;
}

export default function UserForm({ onSubmit: onSubmitParent }: UserFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (onSubmitParent) {
            onSubmitParent(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-group">
                <label htmlFor="name">Nama</label>
                <Input type="text" {...register("name", { required: true })} />
                {errors.name && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input type="email" {...register("email", { required: true })} />
                {errors.email && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="form-group">
                <label htmlFor="age">Umur</label>
                <Input type="number" {...register("age", { required: true })} />
                {errors.age && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="form-group">
                <label htmlFor="education">Pendidikan Terakhir</label>
                <Controller
                    control={control}
                    name="education"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pendidikan terakhir" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sd">SD</SelectItem>
                                <SelectItem value="smp">SMP</SelectItem>
                                <SelectItem value="sma">SMA</SelectItem>
                                <SelectItem value="diploma">Diploma</SelectItem>
                                <SelectItem value="sarjana">Sarjana</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.education && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="form-group">
                <label htmlFor="location">Alamat Domisili</label>
                <Textarea {...register("location", { required: true })} />
                {errors.location && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <Textarea {...register("bio")} />
            </div>

            <div className="flex justify-end">
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
}
