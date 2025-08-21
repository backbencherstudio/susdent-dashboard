import { privateAxios } from "@/components/axiosInstance/axios";
import BannedIcon from "@/components/icons/BannedIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useForm} from "react-hook-form"
import { toast } from "sonner";

interface FormData {
    suspend_endTime: string
}

export default function SuspendUser({id}: {id: string}) {

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {

        const suspend_endTime = new Date(data.suspend_endTime).toISOString();
        data.suspend_endTime = suspend_endTime;

        try {
        const response = await privateAxios.post(`/admin/user/suspenduser/${id}`, data);
        if(response.data)
        {
            toast.success("User suspended successfully", {
            position: "top-right",
            style: {
                backgroundColor: "#4CAF50", 
                color: "#fff", 
            },
            });

            reset();
        }
        } catch (error: any) {
            toast.error(error.response.data, {
            position: "top-right",
            style: {
                backgroundColor: "#f44336",
                color: "#fff",
            },
            });
        } 
    }

  const suspendDialog = () => {
    return ( <Dialog>
      <DialogTrigger className="cursor-pointer flex items-center gap-2 px-[14px] py-[7px] bg-[#F39C12] text-white rounded">
          <BannedIcon />
          <span className="text-sm font-normal">Suspend</span>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
            <DialogTitle>For how long you want to suspend?</DialogTitle>
                <div>
                    <label className="mt-3 mb-2 block text-base font-medium">Choose Date</label>
                    <input  type="datetime-local" {...register("suspend_endTime", {required:"Please choose suspend timeline"})}  className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 focus-visible:border-primary-color"/>

                    {errors.suspend_endTime && (
                        <p className="error-msg">{errors.suspend_endTime.message}</p>
                    )}
                </div>
                <button type="submit" className="mt-3 h-11 w-full rounded bg-primary-color text-white font-base font-medium cursor-pointer">Submit</button>
            </DialogHeader>
        </form>
      </DialogContent>
    </Dialog>)
  }

  return (
    <>
       {suspendDialog()}
    </>
 
  )
}
