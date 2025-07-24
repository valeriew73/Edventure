"use server"

import { initializeAdmin } from "@/lib/firebase-admin";
import { MutationFunction } from "@tanstack/react-query";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

initializeAdmin();
const db = getFirestore()

export const getUser = async (userId: string) => {
    const userSnap = await db.collection("users").doc(userId).get();
    return ({ ...userSnap.data(), userId: userSnap.id }) as unknown as UserMetadata
}

export const setUserMutation: MutationFunction<void, { userId: string, [x: string]: any }> = async (data) => {
    const { userId, isNew, ...rest } = data
    if (!userId) throw new Error("User Id is not defined!");

    await db.collection("users").doc(userId).set({
        ...rest,
        ...isNew ? { createdAt: FieldValue.serverTimestamp() } : { updatedAt: FieldValue.serverTimestamp() }
    }, { merge: true });
}
