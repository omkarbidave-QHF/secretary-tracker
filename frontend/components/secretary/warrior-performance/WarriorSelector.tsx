"use client";

import { User } from "lucide-react";

interface WarriorSelectorProps {
    warriors: string[];
    selected: string;
    onSelect: (name: string) => void;
}

export default function WarriorSelector({
    warriors,
    selected,
    onSelect,
}: WarriorSelectorProps) {
    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700 p-6 mb-8">
            <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <User className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                    <label className="text-gray-300 text-sm font-medium mb-2 block">
                        Select Cyber Warrior
                    </label>
                    <select
                        value={selected}
                        onChange={(e) => onSelect(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 text-white h-12 text-base rounded-xl px-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none cursor-pointer hover:bg-gray-600 transition-colors"
                    >
                        <option value="" disabled className="bg-gray-800">
                            Choose a cyber warrior...
                        </option>
                        {warriors.map((warrior) => (
                            <option key={warrior} value={warrior} className="bg-gray-800">
                                {warrior}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}