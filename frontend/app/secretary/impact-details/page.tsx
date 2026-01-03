"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { impactSchema } from "@/lib/validations/impact";
import { CYBER_WARRIOR_TEAMS } from "@/types/impact";
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
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImpactActivityPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(impactSchema),
    mode: "onChange",
    defaultValues: {
      cyberWarriors: "",
      organization: "",
      leaderName: "",
      messagePropagated: "",
      date: "",
      activityDuration: "",
      location: "",
      participants: "",
      resourceInvolved: "",
      socialLinks: "",
      mediaLinks: "",
      remarks: "",
    },
  });

  const handleSubmit = (data: any) => {
    startTransition(async () => {
      try {
        console.log("Impact Activity Data:", data);

        const response = await fetch("/api/secretary/impact-activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Failed to save impact activity");

        const savedImpact = await response.json();

        toast({
          title: "Success!",
          description: "Impact activity saved. Redirecting to feedback...",
          duration: 2000,
        });

        setTimeout(() => {
          router.push(`/secretary/impact-feedback/${savedImpact.id}?participants=${data.participants}`);
        }, 1000);
      } catch (error) {
        console.error("Error saving impact activity:", error);
        toast({
          title: "Error",
          description: "Failed to save impact activity. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-800 p-10">
      <h1 className="text-3xl font-bold text-gray-100 mb-8 text-center">
        Impact Activity Details
      </h1>

      <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">

            {/* Cyber Warriors Team */}
            <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
              <legend className="text-lg font-semibold text-orange-400 px-3">
                Cyber Warriors Team *
              </legend>
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
            </fieldset>

            {/* Activity Details */}
            <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
              <legend className="text-lg font-semibold text-orange-400 px-3">
                Activity Details *
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Organization Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Organization Name"
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
                  name="leaderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Leader Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Leader Name"
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
                  name="messagePropagated"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-gray-300">Message Propagated *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Message Propagated"
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
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Date *</FormLabel>
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
                  name="activityDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Activity Duration (mins) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Duration in minutes"
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Location *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Location"
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
                  name="participants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Number of Participants *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Number of Participants"
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

            {/* Additional Information */}
            <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
              <legend className="text-lg font-semibold text-orange-400 px-3">
                Additional Information
              </legend>
              <div className="grid grid-cols-1 gap-6 mt-4">

                <FormField
                  control={form.control}
                  name="resourceInvolved"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Resources Involved</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Resources Involved"
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
                  name="socialLinks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Social Media Links</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Social Media Links"
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
                  name="mediaLinks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Print / Online Media Links</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Print / Online Media Links"
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

            {/* Activity Feedback */}
            <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
              <legend className="text-lg font-semibold text-orange-400 px-3">
                Activity Feedback *
              </legend>
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="text-gray-300">Activity Remarks *</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500">
                          <SelectValue placeholder="Select Activity Remarks" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="excellent" className="text-gray-100 focus:bg-gray-600 focus:text-white">
                            ⭐⭐⭐⭐⭐ Excellent
                          </SelectItem>
                          <SelectItem value="good" className="text-gray-100 focus:bg-gray-600 focus:text-white">
                            ⭐⭐⭐⭐ Good
                          </SelectItem>
                          <SelectItem value="better" className="text-gray-100 focus:bg-gray-600 focus:text-white">
                            ⭐⭐⭐ Better
                          </SelectItem>
                          <SelectItem value="satisfactory" className="text-gray-100 focus:bg-gray-600 focus:text-white">
                            ⭐⭐ Satisfactory
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>

            {/* Submit Button */}
            <div className="mt-6">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Save Activity & Continue to Feedback"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
