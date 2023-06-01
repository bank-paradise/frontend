export default function getLocalToken() {
  return `Bearer ${localStorage.getItem("::token")}`;
}
