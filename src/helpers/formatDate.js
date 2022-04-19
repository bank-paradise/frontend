import moment from "moment";

export default function formatDate(initialDate) {
  const date = moment(initialDate).format("DD/MM/YYYY HH:mm");

  return date;
}
