import { toast } from "react-toastify";

export default function createNotification(text = "", callback = () => {}) {
  if (!("Notification" in window)) {
    console.warn("This browser does not support desktop notification");
    return;
  }
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  const notification = new Notification("Nouvelle transaction", {
    body: text,
    icon: "https://beta.bank-paradise.fr/assets/brand/avatar.png",
  });

  toast.success(text);

  notification.onclick = callback;
}
