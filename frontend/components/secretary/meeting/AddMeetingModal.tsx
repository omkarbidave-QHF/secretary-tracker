"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import toast from "react-hot-toast";

interface AddMeetingModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (meeting: any) => void;
}

export default function AddMeetingModal({ open, onClose, onAdd }: AddMeetingModalProps) {
    const [meetingNo, setMeetingNo] = useState("");
    const [meetingDate, setMeetingDate] = useState("");
    const [agenda, setAgenda] = useState<string[]>([""]);
    const [conclusion, setConclusion] = useState("");
    const [remark, setRemark] = useState("");
    const [attendancePhoto, setAttendancePhoto] = useState<File | null>(null);
    const [geoTagPhoto, setGeoTagPhoto] = useState<File | null>(null);

    const addAgendaItem = () => setAgenda([...agenda, ""]);
    const removeAgendaItem = (index: number) => {
        if (agenda.length > 1) {
            setAgenda(agenda.filter((_, i) => i !== index));
        }
    };
    const updateAgendaItem = (index: number, value: string) => {
        const updated = [...agenda];
        updated[index] = value;
        setAgenda(updated);
    };

    const handleSubmit = () => {
        if (!meetingNo || !meetingDate || !conclusion) {
            toast.error("Please fill all required fields");
            return;
        }

        const filteredAgenda = agenda.filter((item) => item.trim() !== "");
        if (filteredAgenda.length === 0) {
            toast.error("Please add at least one agenda item");
            return;
        }

        onAdd({
            meetingNo,
            meetingDate,
            agenda: filteredAgenda,
            conclusion,
            remark,
            attendancePhoto,
            geoTagPhoto,
        });

        // Reset form
        setMeetingNo("");
        setMeetingDate("");
        setAgenda([""]);
        setConclusion("");
        setRemark("");
        setAttendancePhoto(null);
        setGeoTagPhoto(null);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-gray-800 border-gray-700 text-gray-100 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">
                        Add New Meeting
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {/* Meeting Number */}
                    <div>
                        <Label className="text-gray-300">Meeting Number *</Label>
                        <Input
                            placeholder="e.g., Meeting_1"
                            value={meetingNo}
                            onChange={(e) => setMeetingNo(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                        />
                    </div>

                    {/* Meeting Date */}
                    <div>
                        <Label className="text-gray-300">Meeting Date *</Label>
                        <Input
                            type="date"
                            value={meetingDate}
                            onChange={(e) => setMeetingDate(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                        />
                    </div>

                    {/* Agenda Items */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Label className="text-gray-300">Agenda Items *</Label>
                            <Button
                                type="button"
                                onClick={addAgendaItem}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Item
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {agenda.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        placeholder={`Agenda item ${index + 1}`}
                                        value={item}
                                        onChange={(e) => updateAgendaItem(index, e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-gray-100"
                                    />
                                    {agenda.length > 1 && (
                                        <Button
                                            type="button"
                                            onClick={() => removeAgendaItem(index)}
                                            size="icon"
                                            variant="destructive"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Conclusion */}
                    <div>
                        <Label className="text-gray-300">Conclusion *</Label>
                        <Textarea
                            placeholder="Enter meeting conclusion..."
                            value={conclusion}
                            onChange={(e) => setConclusion(e.target.value)}
                            rows={3}
                            className="bg-gray-700 border-gray-600 text-gray-100 mt-1 resize-none"
                        />
                    </div>

                    {/* Remark */}
                    <div>
                        <Label className="text-gray-300">Remark (Optional)</Label>
                        <Textarea
                            placeholder="Any additional remarks..."
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            rows={2}
                            className="bg-gray-700 border-gray-600 text-gray-100 mt-1 resize-none"
                        />
                    </div>

                    {/* Photos */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-gray-300">Attendance Photo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setAttendancePhoto(e.target.files?.[0] || null)
                                }
                                className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-300">Geo Tag Photo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setGeoTagPhoto(e.target.files?.[0] || null)}
                                className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            onClick={handleSubmit}
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        >
                            Add Meeting
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="px-8 border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}