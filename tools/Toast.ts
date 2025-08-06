import toast from "react-hot-toast";

export class Toast {
  static success(message: string) {
    return toast.success(message);
  }

  static error(message: string) {
    return toast.error(message);
  }

  static apiError(error: any) {
    if (typeof error.response?.data?.message === "string") {
      return toast.error(error.response?.data?.message);
    }

    return toast.error("حدث خطأ في السيرفر");
  }
}
