import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function getLocalToken() {
  return `Bearer ${cookies.get("::token")}`;
}
