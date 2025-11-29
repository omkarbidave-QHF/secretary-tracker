"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export interface ClubMember {
    role: string;
    name: string;
    cm1: boolean;
    cm2: boolean;
    cm3: boolean;
}

export interface Meeting {
    id: string;
    srNo: number;
    meetingNo: string;
    meetingDate: string;
    agenda: string[];
    conclusion: string;
    remark: string;
    attendancePhoto: File | null;
    geoTagPhoto: File | null;
}

export function useMeetingLog() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    
    const [clubName, setClubName] = useState(
        "Quick Heal Foundation's Cyber Warrior Club of Pratibha College of Commerce and Computer Studies"
    );
    
    const [members, setMembers] = useState<ClubMember[]>([
        { role: "President", name: "Shravani S", cm1: true, cm2: true, cm3: true },
        { role: "Secretary", name: "Akash T", cm1: true, cm2: true, cm3: true },
        { role: "Activity Director", name: "Olive V", cm1: true, cm2: true, cm3: true },
        { role: "Media Director", name: "Mansi W", cm1: true, cm2: true, cm3: true },
    ]);

    const [availableWeeks, setAvailableWeeks] = useState(9);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);

    const addMeeting = (meeting: Omit<Meeting, "id" | "srNo">) => {
        const newMeeting: Meeting = {
            ...meeting,
            id: Date.now().toString(),
            srNo: meetings.length + 1,
        };
        setMeetings([...meetings, newMeeting]);
        setShowAddModal(false);
        toast.success("Meeting added successfully!");
    };

    const deleteMeeting = (id: string) => {
        setMeetings(meetings.filter((m) => m.id !== id));
        toast.success("Meeting deleted successfully!");
    };

    const handleSave = () => {
        startTransition(async () => {
            console.log("Meeting Log Data:", { clubName, members, meetings });
            
            // TODO: Backend integration
            // const response = await fetch("/api/secretary/meeting-log", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ clubName, members, meetings }),
            // });

            toast.success("Meeting log saved successfully!");
        });
    };

    return {
        clubName,
        setClubName,
        members,
        setMembers,
        availableWeeks,
        setAvailableWeeks,
        meetings,
        addMeeting,
        deleteMeeting,
        showAddModal,
        setShowAddModal,
        handleSave,
        isPending,
    };
}