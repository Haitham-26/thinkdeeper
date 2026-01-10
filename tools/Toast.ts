import toast from "react-hot-toast";

export class Toast {
  static success(message: string) {
    return toast.success(message);
  }

  static error(message: string) {
    return toast.error(message);
  }

  static apiError(error: any) {
    const message = error.response?.data?.message;

    console.log(message);

    if (typeof message === "string") {
      return toast.error(message);
    }

    return toast.error("حدث خطأ في السيرفر");
  }
}
