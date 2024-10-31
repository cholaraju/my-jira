import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }
  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });
    if (loggedInUser) {
      return loggedInUser;
    }
    console.log(user);
    const name = `${user.firstName} 
    ${user.lastName}`;
    console.log(name);
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user", error);
  }
};
