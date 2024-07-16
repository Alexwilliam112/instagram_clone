export default function profilePictureSelector() {
  const options = [
    "https://res.cloudinary.com/dhvalbb4m/image/upload/v1719684856/profile1_lmrlmq.jpg",
    "https://res.cloudinary.com/dhvalbb4m/image/upload/v1719684855/profile2_mxr7dk.jpg",
    "https://res.cloudinary.com/dhvalbb4m/image/upload/v1719684856/profile3_wrgokg.jpg",
    "https://res.cloudinary.com/dhvalbb4m/image/upload/v1719684855/profile4_hdmcev.jpg",
    "https://res.cloudinary.com/dhvalbb4m/image/upload/v1719684855/profile5_clmsy3.jpg",
    "https://res.cloudinary.com/dhvalbb4m/image/upload/v1719684855/profile6_kqq9s9.webp",
    "https://res.cloudinary.com/dhvalbb4m/image/upload/v1719684856/profile7_g7w3zm.jpg",
  ];

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}