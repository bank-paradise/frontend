export default function getUsername(name = "", type = "enterprise") {
  if (type === "enterprise") {
    return name.includes("{{DELETED}}") ? "entreprise supprimée" : name;
  } else {
    return name.includes("{{DELETED}}") ? "compte supprimé" : name;
  }
}
