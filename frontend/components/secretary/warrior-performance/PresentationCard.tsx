"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users, Link2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Presentation } from "@/hooks/secretary/warrior-performance/useCyberWarriorPerformance";
import toast from "react-hot-toast";

interface PresentationCardProps {
    presentation: Presentation;
    index: number;
    onUpdateLinks: (id: string, mediaLinks: any[], socialLinks: any[]) => void;
}

export default function PresentationCard({
    presentation,
    index,
    onUpdateLinks,
}: PresentationCardProps) {
    const [mediaLinks, setMediaLinks] = useState(presentation.mediaLinks);
    const [socialLinks, setSocialLinks] = useState(presentation.socialMediaLinks);
    const [showMediaInput, setShowMediaInput] = useState(false);
    const [showSocialInput, setShowSocialInput] = useState(false);

    const [mediaDate, setMediaDate] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [socialDate, setSocialDate] = useState("");
    const [socialUrl, setSocialUrl] = useState("");

    const getGradeInfo = (grade: string) => {
        const info: Record<string, { label: string; color: string; bgColor: string }> = {
            F: { label: "5th - 7th", color: "text-emerald-400", bgColor: "bg-emerald-500/20 border-emerald-500/50" },
            E: { label: "8th - 10th", color: "text-blue-400", bgColor: "bg-blue-500/20 border-blue-500/50" },
            C: { label: "College", color: "text-orange-400", bgColor: "bg-orange-500/20 border-orange-500/50" },
        };
        return info[grade] || { label: grade, color: "text-gray-400", bgColor: "bg-gray-700" };
    };

    const gradeInfo = getGradeInfo(presentation.grade);

    const handleAddMediaLink = () => {
        if (!mediaDate || !mediaUrl) {
            toast.error("Please fill both date and URL");
            return;
        }

        const newLink = { date: mediaDate, url: mediaUrl };
        const updatedLinks = [...mediaLinks, newLink];
        setMediaLinks(updatedLinks);
        onUpdateLinks(presentation.id, updatedLinks, socialLinks);
        
        setMediaDate("");
        setMediaUrl("");
        setShowMediaInput(false);
        toast.success("Media link added!");
    };

    const handleAddSocialLink = () => {
        if (!socialDate || !socialUrl) {
            toast.error("Please fill both date and URL");
            return;
        }

        const newLink = { date: socialDate, url: socialUrl };
        const updatedLinks = [...socialLinks, newLink];
        setSocialLinks(updatedLinks);
        onUpdateLinks(presentation.id, mediaLinks, updatedLinks);
        
        setSocialDate("");
        setSocialUrl("");
        setShowSocialInput(false);
        toast.success("Social media link added!");
    };

    const handleRemoveMediaLink = (idx: number) => {
        const updatedLinks = mediaLinks.filter((_, i) => i !== idx);
        setMediaLinks(updatedLinks);
        onUpdateLinks(presentation.id, updatedLinks, socialLinks);
        toast.success("Media link removed!");
    };

    const handleRemoveSocialLink = (idx: number) => {
        const updatedLinks = socialLinks.filter((_, i) => i !== idx);
        setSocialLinks(updatedLinks);
        onUpdateLinks(presentation.id, mediaLinks, updatedLinks);
        toast.success("Social media link removed!");
    };

    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 overflow-hidden group hover:shadow-xl hover:shadow-orange-500/10">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-gray-700">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {index + 1}
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg">
                                Presentation {index + 1}
                            </h3>
                            <div className="flex items-center text-gray-400 text-sm mt-1">
                                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                {format(new Date(presentation.date), "dd MMM yyyy")}
                            </div>
                        </div>
                    </div>
                    <span className={`${gradeInfo.bgColor} ${gradeInfo.color} px-3 py-1.5 rounded-full text-xs font-semibold border`}>
                        {gradeInfo.label}
                    </span>
                </div>
            </div>

            {/* Participants */}
            <div className="px-6 py-4 bg-gray-700/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">Participants</span>
                    </div>
                    <span className="text-2xl font-bold text-white">
                        {presentation.participants}
                    </span>
                </div>
            </div>

            {/* Links Section */}
            <div className="p-6 pt-4 space-y-4">
                {/* Media Coverage */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-300 flex items-center">
                            <Link2 className="w-4 h-4 mr-1.5 text-purple-400" />
                            Media Coverage
                        </span>
                        {!showMediaInput && (
                            <button
                                onClick={() => setShowMediaInput(true)}
                                className="text-purple-400 hover:text-purple-300 text-sm font-medium hover:bg-purple-500/10 px-3 py-1 rounded-lg transition-colors"
                            >
                                + Add
                            </button>
                        )}
                    </div>

                    {showMediaInput && (
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-3 space-y-3">
                            <Input
                                type="date"
                                value={mediaDate}
                                onChange={(e) => setMediaDate(e.target.value)}
                                className="bg-gray-700 border-purple-500/30 text-white focus:border-purple-500 focus:ring-purple-500"
                            />
                            <Input
                                type="url"
                                placeholder="Enter media link URL"
                                value={mediaUrl}
                                onChange={(e) => setMediaUrl(e.target.value)}
                                className="bg-gray-700 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                            />
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                                    onClick={handleAddMediaLink}
                                >
                                    Save
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        setShowMediaInput(false);
                                        setMediaDate("");
                                        setMediaUrl("");
                                    }}
                                    className="border-purple-500/30 hover:bg-purple-500/10 text-gray-300"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {mediaLinks.length > 0 ? (
                        <div className="space-y-2">
                            {mediaLinks.map((link, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 group/item hover:bg-purple-500/20 transition-colors"
                                >
                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                        <span className="text-xs text-purple-400 font-medium">
                                            {format(new Date(link.date), "dd MMM")}
                                        </span>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-gray-300 hover:text-purple-400 truncate underline decoration-dotted"
                                        >
                                            {link.url}
                                        </a>
                                    </div>
                                    <button 
                                        onClick={() => handleRemoveMediaLink(idx)}
                                        className="text-red-400 hover:text-red-300 ml-2 hover:bg-red-500/10 p-1 rounded transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !showMediaInput && (
                            <p className="text-gray-500 text-xs italic">No links added</p>
                        )
                    )}
                </div>

                {/* Social Media - Same structure */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-300 flex items-center">
                            <Link2 className="w-4 h-4 mr-1.5 text-blue-400" />
                            Social Media
                        </span>
                        {!showSocialInput && (
                            <button
                                onClick={() => setShowSocialInput(true)}
                                className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:bg-blue-500/10 px-3 py-1 rounded-lg transition-colors"
                            >
                                + Add
                            </button>
                        )}
                    </div>

                    {showSocialInput && (
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-3 space-y-3">
                            <Input
                                type="date"
                                value={socialDate}
                                onChange={(e) => setSocialDate(e.target.value)}
                                className="bg-gray-700 border-blue-500/30 text-white focus:border-blue-500 focus:ring-blue-500"
                            />
                            <Input
                                type="url"
                                placeholder="Enter social media link URL"
                                value={socialUrl}
                                onChange={(e) => setSocialUrl(e.target.value)}
                                className="bg-gray-700 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    onClick={handleAddSocialLink}
                                >
                                    Save
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        setShowSocialInput(false);
                                        setSocialDate("");
                                        setSocialUrl("");
                                    }}
                                    className="border-blue-500/30 hover:bg-blue-500/10 text-gray-300"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {socialLinks.length > 0 ? (
                        <div className="space-y-2">
                            {socialLinks.map((link, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 group/item hover:bg-blue-500/20 transition-colors"
                                >
                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                        <span className="text-xs text-blue-400 font-medium">
                                            {format(new Date(link.date), "dd MMM")}
                                        </span>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-gray-300 hover:text-blue-400 truncate underline decoration-dotted"
                                        >
                                            {link.url}
                                        </a>
                                    </div>
                                    <button 
                                        onClick={() => handleRemoveSocialLink(idx)}
                                        className="text-red-400 hover:text-red-300 ml-2 hover:bg-red-500/10 p-1 rounded transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !showSocialInput && (
                            <p className="text-gray-500 text-xs italic">No links added</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}