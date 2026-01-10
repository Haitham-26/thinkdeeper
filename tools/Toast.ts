import toast from "react-hot-toast";

export class Toast {
  static success(message: string) {
    return toast.success(message);
  }

  static error(message: string) {
    return toast.error(message);
  }

  static apiError(error: any) {
    if (typeof error.response?.data?.error === "string") {
      return toast.error(error.response?.data?.error);
    } else if (typeof error.response?.data?.error?.message === "string") {
      return toast.error(error.response?.data?.error?.message);
    }

    return toast.error("حدث خطأ في السيرفر");
  }
}
