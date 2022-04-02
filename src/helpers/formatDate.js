export default function formatDate(initialDate) {
  const formatedDate = new Date(initialDate);
  const date = `${formatedDate.getDate()}/${
    formatedDate.getMonth() + 1
  }/${formatedDate.getFullYear()}`;

  return date;
}
