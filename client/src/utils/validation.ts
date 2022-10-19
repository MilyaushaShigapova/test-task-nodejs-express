import { toast } from "react-toastify";

export const validateLink = (link: string): boolean => {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  if (link.length > 999) {
    toast.error("Длина ссылка должна быть не больше 999 символов", {
      toastId: "link_max_length",
    });
  }

  return urlRegex.test(link) && link.length < 900;
};
export const validateLinkName = (link: string): boolean => {
  const urlRegex = /^[a-zA-Z0-9_]+$/;

  if (link.length > 10) {
    toast.error("Длина названии ссылки должна быть не больше 10 символов", {
      toastId: "linkName_max_length",
    });
  }

  return urlRegex.test(link) && link.length < 10;
};
