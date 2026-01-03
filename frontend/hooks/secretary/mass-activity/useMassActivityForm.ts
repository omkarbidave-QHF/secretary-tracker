"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSessionContext } from "@/context/session";
import toast from "react-hot-toast";
import * as z from "zod";

const massActivitySchema = z.object({
    activityName: z.string().min(1, "Activity name is required"),
    activityDescription: z.string().min(1, "Description is required"),
    date: z.string().min(1, "Date is required"),
    duration: z.string().min(1, "Duration is required"),
    location: z.string().min(1, "Location is required"),
    participants: z.number().min(1, "At least 1 participant required"),
    stakeholders: z.string().min(1, "Stakeholders information required"),
    socialMediaLinks: z.array(z.string().url("Invalid URL").or(z.literal(""))).optional(),
    mediaLinks: z.array(z.string().url("Invalid URL").or(z.literal(""))).optional(),
});

export type MassActivityFormData = z.infer<typeof massActivitySchema>;

export function useMassActivityForm() {
    const router = useRouter();
    const { session } = useSessionContext();
    const [isPending, startTransition] = useTransition();
    const [socialMediaLinks, setSocialMediaLinks] = useState<string[]>([""]);
    const [mediaLinks, setMediaLinks] = useState<string[]>([""]);

    const form = useForm<MassActivityFormData>({
        resolver: zodResolver(massActivitySchema),
        mode: "onChange",
        defaultValues: {
            activityName: "",
            activityDescription: "",
            date: "",
            duration: "",
            location: "",
            participants: 0,
            stakeholders: "",
            socialMediaLinks: [""],
            mediaLinks: [""],
        },
    });

    const addSocialMediaLink = () => {
        setSocialMediaLinks([...socialMediaLinks, ""]);
        form.setValue("socialMediaLinks", [...socialMediaLinks, ""]);
    };

    const removeSocialMediaLink = (index: number) => {
        const updated = socialMediaLinks.filter((_, i) => i !== index);
        setSocialMediaLinks(updated);
        form.setValue("socialMediaLinks", updated);
    };

    const updateSocialMediaLink = (index: number, value: string) => {
        const updated = [...socialMediaLinks];
        updated[index] = value;
        setSocialMediaLinks(updated);
        form.setValue("socialMediaLinks", updated);
    };

    const addMediaLink = () => {
        setMediaLinks([...mediaLinks, ""]);
        form.setValue("mediaLinks", [...mediaLinks, ""]);
    };

    const removeMediaLink = (index: number) => {
        const updated = mediaLinks.filter((_, i) => i !== index);
        setMediaLinks(updated);
        form.setValue("mediaLinks", updated);
    };

    const updateMediaLink = (index: number, value: string) => {
        const updated = [...mediaLinks];
        updated[index] = value;
        setMediaLinks(updated);
        form.setValue("mediaLinks", updated);
    };

    const handleSubmit = (data: MassActivityFormData) => {
        if (!session?.user?.institutionId) {
            toast.error("Institution ID not found. Please login again.");
            return;
        }

        startTransition(async () => {
            try {
                // Filter out empty links
                const filteredData = {
                    ...data,
                    socialMediaLinks: socialMediaLinks.filter(link => link.trim() !== ""),
                    mediaLinks: mediaLinks.filter(link => link.trim() !== ""),
                };

                console.log("Mass Activity Data:", filteredData);

                const response = await fetch("/api/secretary/mass-activity", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...filteredData,
                        institutionId: session.user.institutionId,
                    }),
                });
                if (!response.ok) throw new Error("Failed to submit");

                toast.success("Mass activity submitted successfully!", {
                    duration: 3000,
                    position: "top-center",
                });

                setTimeout(() => {
                    router.push("/secretary/dashboard");
                }, 1000);
            } catch (error) {
                console.error("Submit error:", error);
                toast.error("Failed to submit mass activity");
            }
        });
    };

    return {
        form,
        isPending,
        handleSubmit,
        socialMediaLinks,
        addSocialMediaLink,
        removeSocialMediaLink,
        updateSocialMediaLink,
        mediaLinks,
        addMediaLink,
        removeMediaLink,
        updateMediaLink,
    };
}