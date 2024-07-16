export default function followingSelector() {
  const options = [
    "Followed by infrographicShow + 2 more",
    "Followed by hacktiv8 + 9 more",
    "Followed by godaddy.com",
    "Followed by triplezeroFive + 3 more",
    "Followed by alex21 + 12 more",
    "Followed by michelst + 8 more",
    "  ",
    "  ",
    "  ",
  ];

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
