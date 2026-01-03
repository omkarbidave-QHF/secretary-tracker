"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSessionContext } from "@/context/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { presentationSchema } from "@/lib/validations/presentation";
import { calculateStudentTotals } from "@/lib/utils/form-helper";
import { CYBER_WARRIOR_TEAMS } from "@/types/presentation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import type { ClassGroup, StudentCounts } from "@/types/presentation";

export default function PresentationDetailsPage() {
    const router = useRouter();
    const { session } = useSessionContext();
    const [isPending, startTransition] = useTransition();
    const [studentCounts, setStudentCounts] = useState<StudentCounts>({
        totalBoys: 0,
        totalGirls: 0,
        totalStudents: 0,
    });

    const form = useForm({
        resolver: zodResolver(presentationSchema),
        mode: "onChange",
        defaultValues: {
            cyberWarriors: "",
            schoolName: "",
            address: "",
            phoneNo: "",
            emailId: "",
            principalName: "",
            city: "",
            taluka: "",
            district: "",
            medium: "",
            presentationDate: "",
            timeFrom: "",
            timeTo: "",
            classGroup: "",
            std5Boys: 0,
            std5Girls: 0,
            std6Boys: 0,
            std6Girls: 0,
            std7Boys: 0,
            std7Girls: 0,
            std8Boys: 0,
            std8Girls: 0,
            std9Boys: 0,
            std9Girls: 0,
            std10Boys: 0,
            std10Girls: 0,
            std11Boys: 0,
            std11Girls: 0,
            std12Boys: 0,
            std12Girls: 0,
            collegeBoys: 0,
            collegeGirls: 0,
            presentationRating: "",
            remarks: "",
        },
    });

    const classGroup = form.watch("classGroup");

    useEffect(() => {
        const subscription = form.watch((value) => {
            startTransition(() => {
                const totals = calculateStudentTotals(value, classGroup);
                setStudentCounts(totals);
            });
        });

        return () => subscription.unsubscribe();
    }, [form, classGroup]);

    const handlePresentationSubmit = (data: any) => {
        if (studentCounts.totalStudents === 0) {
            alert("Please enter at least one student count");
            return;
        }

        startTransition(async () => {
            try {
                console.log("Presentation Data:", data);

                // Prepare student data for backend
                const studentData = [];
                if (data.classGroup === "5-7") {
                    studentData.push(
                        { classType: "STD_5", boysCount: data.std5Boys || 0, GirlsCount: data.std5Girls || 0 },
                        { classType: "STD_6", boysCount: data.std6Boys || 0, GirlsCount: data.std6Girls || 0 },
                        { classType: "STD_7", boysCount: data.std7Boys || 0, GirlsCount: data.std7Girls || 0 }
                    );
                } else if (data.classGroup === "8-10") {
                    studentData.push(
                        { classType: "STD_8", boysCount: data.std8Boys || 0, GirlsCount: data.std8Girls || 0 },
                        { classType: "STD_9", boysCount: data.std9Boys || 0, GirlsCount: data.std9Girls || 0 },
                        { classType: "STD_10", boysCount: data.std10Boys || 0, GirlsCount: data.std10Girls || 0 }
                    );
                } else if (data.classGroup === "college") {
                    studentData.push(
                        { classType: "STD_11", boysCount: data.std11Boys || 0, GirlsCount: data.std11Girls || 0 },
                        { classType: "STD_12", boysCount: data.std12Boys || 0, GirlsCount: data.std12Girls || 0 },
                        { classType: "COLLEGE", boysCount: data.collegeBoys || 0, GirlsCount: data.collegeGirls || 0 }
                    );
                }

                if (!session?.user?.institutionId) {
                    alert("Institution ID not found. Please login again.");
                    return;
                }

                const response = await fetch("/api/secretary/presentation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...data,
                        studentData,
                        institutionId: session.user.institutionId,
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Failed to save presentation. Status:", response.status, "Body:", errorText);
                    throw new Error(`Failed to save presentation: ${response.status} ${errorText}`);
                }

                const savedPresentation = await response.json();

                router.push(
                    `/secretary/feedback/${savedPresentation.id}?classGroup=${data.classGroup}&totalStudents=${studentCounts.totalStudents}`
                );
            } catch (error) {
                console.error("Error saving presentation:", error);
                alert(`Failed to save presentation report. Details: ${error}`);
            }
        });
    };

    const renderStudentCountFields = () => {
        if (!classGroup) return null;

        const getStandardFields = () => {
            if (classGroup === "5-7") {
                return [
                    { std: "5th", boysName: "std5Boys", girlsName: "std5Girls" },
                    { std: "6th", boysName: "std6Boys", girlsName: "std6Girls" },
                    { std: "7th", boysName: "std7Boys", girlsName: "std7Girls" },
                ];
            } else if (classGroup === "8-10") {
                return [
                    { std: "8th", boysName: "std8Boys", girlsName: "std8Girls" },
                    { std: "9th", boysName: "std9Boys", girlsName: "std9Girls" },
                    { std: "10th", boysName: "std10Boys", girlsName: "std10Girls" },
                ];
            } else if (classGroup === "college") {
                return [
                    { std: "11th", boysName: "std11Boys", girlsName: "std11Girls" },
                    { std: "12th", boysName: "std12Boys", girlsName: "std12Girls" },
                    { std: "College", boysName: "collegeBoys", girlsName: "collegeGirls" },
                ];
            }
            return [];
        };

        const fields = getStandardFields();

        return (
            <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
                <legend className="text-lg font-semibold text-orange-400 px-3">
                    Number of Students - {classGroup === "5-7" ? "STD 5-7" : classGroup === "8-10" ? "STD 8-10" : "College"}
                </legend>
                <div className="mt-4 space-y-4">
                    {fields.map((field) => (
                        <div key={field.std} className="grid grid-cols-3 gap-4 items-center">
                            <Label className="text-gray-300 font-medium">{field.std}</Label>
                            <FormField
                                control={form.control}
                                name={field.boysName as any}
                                render={({ field: formField }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                placeholder="Boys"
                                                {...formField}
                                                onChange={(e) => formField.onChange(Number(e.target.value))}
                                                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={field.girlsName as any}
                                render={({ field: formField }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                placeholder="Girls"
                                                {...formField}
                                                onChange={(e) => formField.onChange(Number(e.target.value))}
                                                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}

                    <div className="mt-6 pt-4 border-t border-gray-700">
                        <div className="grid grid-cols-3 gap-4 text-lg font-semibold">
                            <div className="text-orange-400">Total</div>
                            <div className="text-blue-400 bg-blue-900/20 rounded-lg p-3 text-center">
                                Boys: {isPending ? <Loader2 className="h-4 w-4 animate-spin inline" /> : studentCounts.totalBoys}
                            </div>
                            <div className="text-pink-400 bg-pink-900/20 rounded-lg p-3 text-center">
                                Girls: {isPending ? <Loader2 className="h-4 w-4 animate-spin inline" /> : studentCounts.totalGirls}
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <div className="bg-green-900/20 text-green-400 rounded-lg p-3 text-xl font-bold">
                                Total Students: {isPending ? <Loader2 className="h-4 w-4 animate-spin inline" /> : studentCounts.totalStudents}
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    };

    return (
        <div className="min-h-screen bg-gray-800 p-10">
            <h1 className="text-3xl font-bold text-gray-100 mb-8 text-center">
                Visit Report - Cyber Shiksha for Cyber Suraksha
            </h1>

            <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handlePresentationSubmit)} className="space-y-8">

                        {/* Cyber Warriors Fieldset - SINGLE DROPDOWN */}
                        <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
                            <legend className="text-lg font-semibold text-orange-400 px-3">
                                Cyber Warriors Team *
                            </legend>
                            <div className="mt-4">
                                <FormField
                                    control={form.control}
                                    name="cyberWarriors"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Select Cyber Warriors *</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500">
                                                        <SelectValue placeholder="Choose Cyber Warrior Team" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-700 border-gray-600">
                                                        {CYBER_WARRIOR_TEAMS.map((team) => (
                                                            <SelectItem
                                                                key={team.value}
                                                                value={team.value}
                                                                className="text-gray-100 focus:bg-gray-600 focus:text-white"
                                                            >
                                                                {team.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </fieldset>

                        {/* School Details Fieldset */}
                        <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
                            <legend className="text-lg font-semibold text-orange-400 px-3">
                                School / College Details *
                            </legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <FormField
                                    control={form.control}
                                    name="schoolName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Name of School / College *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="School / College Name"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Address *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Address"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phoneNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Phone No *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="10-digit phone number"
                                                    maxLength={10}
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="emailId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Email ID *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Email ID"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="principalName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Principal / Coordinator Name *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Principal / Coordinator Name"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="medium"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Medium *</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500">
                                                        <SelectValue placeholder="Select Medium" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-700 border-gray-600">
                                                        <SelectItem value="english" className="text-gray-100 focus:bg-gray-600 focus:text-white">English</SelectItem>
                                                        <SelectItem value="hindi" className="text-gray-100 focus:bg-gray-600 focus:text-white">Hindi</SelectItem>
                                                        <SelectItem value="marathi" className="text-gray-100 focus:bg-gray-600 focus:text-white">Marathi</SelectItem>
                                                        <SelectItem value="urdu" className="text-gray-100 focus:bg-gray-600 focus:text-white">Urdu</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </fieldset>

                        {/* Location Fieldset */}
                        <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
                            <legend className="text-lg font-semibold text-orange-400 px-3">Location Details *</legend>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">City *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="City"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="taluka"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Taluka *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Taluka"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="district"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">District *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="District"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </fieldset>

                        {/* Class Group Selection */}
                        <fieldset className="border border-orange-500 rounded-lg p-6 bg-orange-900/10">
                            <legend className="text-lg font-semibold text-orange-400 px-3">Target Class Group *</legend>
                            <FormField
                                control={form.control}
                                name="classGroup"
                                render={({ field }) => (
                                    <FormItem className="mt-4">
                                        <FormLabel className="text-gray-300">Select Class Group *</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500">
                                                    <SelectValue placeholder="Choose Class Group" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-700 border-gray-600">
                                                    <SelectItem value="5-7" className="text-gray-100 focus:bg-gray-600 focus:text-white">STD 5-7 (Junior)</SelectItem>
                                                    <SelectItem value="8-10" className="text-gray-100 focus:bg-gray-600 focus:text-white">STD 8-10 (Middle)</SelectItem>
                                                    <SelectItem value="college" className="text-gray-100 focus:bg-gray-600 focus:text-white">College Students (11, 12 & College)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </fieldset>

                        {/* Dynamic Student Count Fields */}
                        {renderStudentCountFields()}

                        {/* Presentation Schedule */}
                        <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
                            <legend className="text-lg font-semibold text-orange-400 px-3">Presentation Schedule *</legend>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                <FormField
                                    control={form.control}
                                    name="presentationDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Date of Presentation *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="timeFrom"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Time From *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="timeTo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Time To *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    {...field}
                                                    className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </fieldset>

                        {/* School Authority Rating */}
                        <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
                            <legend className="text-lg font-semibold text-orange-400 px-3">For School Authority *</legend>
                            <div className="space-y-4 mt-4">
                                <FormField
                                    control={form.control}
                                    name="presentationRating"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-medium text-gray-200">
                                                Rate "Cyber Awareness Presentation" *
                                            </FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500">
                                                        <SelectValue placeholder="Select Rating" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-700 border-gray-600">
                                                        <SelectItem value="excellent" className="text-gray-100 focus:bg-gray-600 focus:text-white">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                                                        <SelectItem value="good" className="text-gray-100 focus:bg-gray-600 focus:text-white">⭐⭐⭐⭐ Good</SelectItem>
                                                        <SelectItem value="better" className="text-gray-100 focus:bg-gray-600 focus:text-white">⭐⭐⭐ Better</SelectItem>
                                                        <SelectItem value="satisfactory" className="text-gray-100 focus:bg-gray-600 focus:text-white">⭐⭐ Satisfactory</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="remarks"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-300">Remarks and Suggestions</FormLabel>
                                            <FormControl>
                                                <textarea
                                                    {...field}
                                                    rows={4}
                                                    placeholder="Enter remarks and suggestions..."
                                                    className="w-full bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500 rounded-lg p-3"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </fieldset>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <Button
                                type="submit"
                                disabled={isPending || studentCounts.totalStudents === 0}
                                className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Save Visit Report & Continue to Digital Behavior Survey"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}