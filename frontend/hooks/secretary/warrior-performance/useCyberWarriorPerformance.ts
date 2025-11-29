"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export interface Presentation {
    id: string;
    date: string;
    participants: number;
    grade: "F" | "E" | "C";
    mediaLinks: { date: string; url: string }[];
    socialMediaLinks: { date: string; url: string }[];
}

export interface ImpactActivity {
    id: string;
    date: string;
    participants: number;
    mediaLinks: { date: string; url: string }[];
    socialMediaLinks: { date: string; url: string }[];
}

export interface FrameChallenge {
    id: string;
    date: string;
    challengeName: string;
}

export interface SocialMediaPost {
    id: string;
    date: string;
    numberOfPosts: number;
    accountId: string;
}

export interface MediaCoverage {
    id: string;
    date: string;
    mediaName: string;
    link: string;
}

export interface WarriorPerformance {
    name: string;
    target: {
        weeks: number;
        presentationsPerWeek: number;
        impactPerWeek: number;
        impactOutreachPerWeek: number;
        presentations: number;
        fifth7th: number;
        eighth10th: number;
        college: number;
        studentsSensitization: number;
        studentsSensitization5th7th: number;
        studentsSensitization8th10th: number;
        studentsSensitizationCollege: number;
        impactTarget: number;
        impactOutreach: number;
        bookletDownload: number;
        socialMediaPosts: number;
        frameChallenge: number;
        mediaCoverage: number;
    };
    achievement: {
        weeks: number;
        presentationsPerWeek: number;
        impactPerWeek: number;
        impactOutreachPerWeek: number;
        presentations: number;
        fifth7th: number;
        eighth10th: number;
        college: number;
        studentsSensitization: number;
        studentsSensitization5th7th: number;
        studentsSensitization8th10th: number;
        studentsSensitizationCollege: number;
        impactTarget: number;
        impactOutreach: number;
        bookletDownload: number;
        socialMediaPosts: number;
        frameChallenge: number;
        mediaCoverage: number;
    };
    presentations: Presentation[];
    impactActivities: ImpactActivity[];
    frameChallenges: FrameChallenge[];
    socialMediaPosts: SocialMediaPost[];
    mediaCoverages: MediaCoverage[];
}

const initialWarriors: WarriorPerformance[] = [
    {
        name: "Akash T",
        target: {
            weeks: 9,
            presentationsPerWeek: 1.0,
            impactPerWeek: 0.56,
            impactOutreachPerWeek: 22.22,
            presentations: 14,
            fifth7th: 2.8,
            eighth10th: 2.8,
            college: 2.8,
            studentsSensitization: 2800,
            studentsSensitization5th7th: 560,
            studentsSensitization8th10th: 560,
            studentsSensitizationCollege: 560,
            impactTarget: 5,
            impactOutreach: 200,
            bookletDownload: 200,
            socialMediaPosts: 12,
            frameChallenge: 5,
            mediaCoverage: 1,
        },
        achievement: {
            weeks: 6,
            presentationsPerWeek: 1.0,
            impactPerWeek: 0.0,
            impactOutreachPerWeek: 13.17,
            presentations: 6,
            fifth7th: 3,
            eighth10th: 0,
            college: 3,
            studentsSensitization: 1234,
            studentsSensitization5th7th: 624,
            studentsSensitization8th10th: 0,
            studentsSensitizationCollege: 610,
            impactTarget: 0,
            impactOutreach: 79,
            bookletDownload: 0,
            socialMediaPosts: 0,
            frameChallenge: 0,
            mediaCoverage: 0,
        },
        presentations: [
            {
                id: "p1",
                date: "2025-06-25",
                participants: 210,
                grade: "F",
                mediaLinks: [],
                socialMediaLinks: [],
            },
            {
                id: "p2",
                date: "2025-06-25",
                participants: 213,
                grade: "F",
                mediaLinks: [],
                socialMediaLinks: [],
            },
            {
                id: "p3",
                date: "2025-06-25",
                participants: 201,
                grade: "F",
                mediaLinks: [],
                socialMediaLinks: [],
            },
            {
                id: "p4",
                date: "2025-06-30",
                participants: 220,
                grade: "C",
                mediaLinks: [],
                socialMediaLinks: [],
            },
            {
                id: "p5",
                date: "2025-06-30",
                participants: 190,
                grade: "C",
                mediaLinks: [],
                socialMediaLinks: [],
            },
            {
                id: "p6",
                date: "2025-06-30",
                participants: 200,
                grade: "C",
                mediaLinks: [],
                socialMediaLinks: [],
            },
        ],
        impactActivities: [
            {
                id: "i1",
                date: "2025-06-27",
                participants: 41,
                mediaLinks: [],
                socialMediaLinks: [],
            },
            {
                id: "i2",
                date: "2025-07-03",
                participants: 38,
                mediaLinks: [],
                socialMediaLinks: [],
            },
        ],
        frameChallenges: [],
        socialMediaPosts: [],
        mediaCoverages: [],
    },
    {
        name: "Olive V",
        target: {
            weeks: 9,
            presentationsPerWeek: 1.0,
            impactPerWeek: 0.56,
            impactOutreachPerWeek: 22.22,
            presentations: 14,
            fifth7th: 2.8,
            eighth10th: 2.8,
            college: 2.8,
            studentsSensitization: 2800,
            studentsSensitization5th7th: 560,
            studentsSensitization8th10th: 560,
            studentsSensitizationCollege: 560,
            impactTarget: 5,
            impactOutreach: 200,
            bookletDownload: 200,
            socialMediaPosts: 12,
            frameChallenge: 5,
            mediaCoverage: 1,
        },
        achievement: {
            weeks: 6,
            presentationsPerWeek: 1.0,
            impactPerWeek: 0.0,
            impactOutreachPerWeek: 13.17,
            presentations: 6,
            fifth7th: 3,
            eighth10th: 0,
            college: 3,
            studentsSensitization: 1234,
            studentsSensitization5th7th: 624,
            studentsSensitization8th10th: 0,
            studentsSensitizationCollege: 610,
            impactTarget: 0,
            impactOutreach: 79,
            bookletDownload: 0,
            socialMediaPosts: 0,
            frameChallenge: 0,
            mediaCoverage: 0,
        },
        presentations: [],
        impactActivities: [],
        frameChallenges: [],
        socialMediaPosts: [],
        mediaCoverages: [],
    },
];

export function useCyberWarriorPerformance() {
    const [warriors, setWarriors] = useState<WarriorPerformance[]>(initialWarriors);
    const [selectedWarrior, setSelectedWarrior] = useState<string>("");

    const getSelectedWarriorData = () => {
        return warriors.find((w) => w.name === selectedWarrior);
    };

    // Update Presentation Links
    const updatePresentationLinks = (
        presentationId: string,
        mediaLinks: { date: string; url: string }[],
        socialLinks: { date: string; url: string }[]
    ) => {
        setWarriors((prev) =>
            prev.map((warrior) => {
                if (warrior.name === selectedWarrior) {
                    return {
                        ...warrior,
                        presentations: warrior.presentations.map((p) =>
                            p.id === presentationId
                                ? { ...p, mediaLinks, socialMediaLinks: socialLinks }
                                : p
                        ),
                    };
                }
                return warrior;
            })
        );
    };

    // Update Impact Activity Links
    const updateImpactLinks = (
        activityId: string,
        mediaLinks: { date: string; url: string }[],
        socialLinks: { date: string; url: string }[]
    ) => {
        setWarriors((prev) =>
            prev.map((warrior) => {
                if (warrior.name === selectedWarrior) {
                    return {
                        ...warrior,
                        impactActivities: warrior.impactActivities.map((a) =>
                            a.id === activityId
                                ? { ...a, mediaLinks, socialMediaLinks: socialLinks }
                                : a
                        ),
                    };
                }
                return warrior;
            })
        );
    };

    // Add Frame Challenge
    const addFrameChallenge = (challenge: Omit<FrameChallenge, "id">) => {
        const newChallenge: FrameChallenge = {
            ...challenge,
            id: `fc_${Date.now()}`,
        };

        setWarriors((prev) =>
            prev.map((warrior) => {
                if (warrior.name === selectedWarrior) {
                    return {
                        ...warrior,
                        frameChallenges: [...warrior.frameChallenges, newChallenge],
                    };
                }
                return warrior;
            })
        );

        toast.success("Frame challenge added!");
    };

    // Remove Frame Challenge
    const removeFrameChallenge = (challengeId: string) => {
        setWarriors((prev) =>
            prev.map((warrior) => {
                if (warrior.name === selectedWarrior) {
                    return {
                        ...warrior,
                        frameChallenges: warrior.frameChallenges.filter(
                            (c) => c.id !== challengeId
                        ),
                    };
                }
                return warrior;
            })
        );

        toast.success("Frame challenge removed!");
    };

    // Save all changes to backend
    const saveChanges = async () => {
        try {
            console.log("Saving warrior data:", warriors);

            // TODO: Backend team - API integration
            // const response = await fetch("/api/secretary/warrior-performance", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(warriors),
            // });
            // 
            // if (!response.ok) throw new Error("Failed to save");
            // const data = await response.json();

            toast.success("All changes saved successfully!");
            return true;
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Failed to save changes");
            return false;
        }
    };

    // Get all data for backend (formatted for easy DB insertion)
    const getFormattedDataForBackend = () => {
        return warriors.map((warrior) => ({
            warriorName: warrior.name,
            target: warrior.target,
            achievement: warrior.achievement,
            presentations: warrior.presentations.map((p) => ({
                id: p.id,
                date: p.date,
                participants: p.participants,
                grade: p.grade,
                mediaLinks: p.mediaLinks,
                socialMediaLinks: p.socialMediaLinks,
            })),
            impactActivities: warrior.impactActivities.map((a) => ({
                id: a.id,
                date: a.date,
                participants: a.participants,
                mediaLinks: a.mediaLinks,
                socialMediaLinks: a.socialMediaLinks,
            })),
            frameChallenges: warrior.frameChallenges,
            socialMediaPosts: warrior.socialMediaPosts,
            mediaCoverages: warrior.mediaCoverages,
        }));
    };

    return {
        warriors,
        selectedWarrior,
        setSelectedWarrior,
        getSelectedWarriorData,
        updatePresentationLinks,
        updateImpactLinks,
        addFrameChallenge,
        removeFrameChallenge,
        saveChanges,
        getFormattedDataForBackend,
    };
}