import { app } from "../lib/firebase";

export async function recoveryUserInfo() {
  // console.log(currentUser);
  return {
    user: {
      name: "Guilherme",
      email: "gmoreiratdj@gmail.com",
      avatarURL:
        "https://icon-library.com/images/default-profile-icon/default-profile-icon-8.jpg",
    },
  };
}
