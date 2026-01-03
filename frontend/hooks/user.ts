"use server";

import { auth, signOut } from "@/auth";
import prisma from "@/lib/db";

export async function getSessionUser() {
  return await auth();
}

export async function logOut() {
  return await signOut();
}

export async function getTypeOfUser() {
  const session = await auth();
  return session?.user.role;
}

type FetchUser = {
  id: string;
  name: string;
  email: string;
  institutionId?: string;
  role: "TEACHER" | "SECRETARY";
};

export async function getTeacherById(id: string): Promise<FetchUser | null> {
  const teacher = await prisma.teacher.findUnique({
    where: {
      id,
    },
  });
  if (teacher) {
    return {
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      role: "TEACHER" as const,
    };
  } else return null;
}

export async function getSecretaryById(id: string): Promise<FetchUser | null> {
  const secretary = await prisma.secretary.findUnique({
    where: {
      id,
    },
  });
  if (secretary) {
    return {
      id: secretary.id,
      name: secretary.name,
      email: secretary.email,
      institutionId: secretary.institution_id,
      role: "SECRETARY" as const,
    };
  } else return null;
}
