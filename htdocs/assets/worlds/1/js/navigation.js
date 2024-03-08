function OpenLink({ target, event }) {
  var shortner = "https://codename.vrchat.eu.org/leyanahomekit";
  switch (target) {
    case "VRChat":
      window.open(`${shortner}/vrchat`);
      break;
    case "GitHub":
      window.open(`${shortner}/github`);
    default:
      break;
  }

  event.preventDefault();
  return false;
}
