"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackFormCollegeProps {
  totalStudents: number;
  presentationId: string;
}

export default function FeedbackFormCollege({ totalStudents, presentationId }: FeedbackFormCollegeProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [responseCounts, setResponseCounts] = useState({
    // Pre-Survey
    q1_neverShare: 0,
    q1_sometimesAvoid: 0,
    q1_feelsNormal: 0,
    q2_blockReport: 0,
    q2_ignore: 0,
    q2_clickCuriosity: 0,
    q3_always: 0,
    q3_sometimes: 0,
    q3_rarelyNever: 0,
    q4_keepPrivate: 0,
    q4_postCarefully: 0,
    q4_postEverything: 0,
    // Post-Survey
    p1_verifyBefore: 0,
    p1_extraCareful: 0,
    p1_stillUnsure: 0,
    p2_reportInform: 0,
    p2_ignore: 0,
    p2_notBigDeal: 0,
    p3_secureSettings: 0,
    p3_startSlowly: 0,
    p3_fineAsIs: 0,
    p4_morePrivate: 0,
    p4_lessPersonal: 0,
    p4_noChange: 0,
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getQuestionTotal = (keys: string[]) => {
    return keys.reduce((sum, key) => sum + (responseCounts[key as keyof typeof responseCounts] || 0), 0);
  };

  const validateForm = () => {
    const errors: string[] = [];

    const questions = [
      { keys: ["q1_neverShare", "q1_sometimesAvoid", "q1_feelsNormal"], label: "Q1" },
      { keys: ["q2_blockReport", "q2_ignore", "q2_clickCuriosity"], label: "Q2" },
      { keys: ["q3_always", "q3_sometimes", "q3_rarelyNever"], label: "Q3" },
      { keys: ["q4_keepPrivate", "q4_postCarefully", "q4_postEverything"], label: "Q4" },
      { keys: ["p1_verifyBefore", "p1_extraCareful", "p1_stillUnsure"], label: "Post-Q1" },
      { keys: ["p2_reportInform", "p2_ignore", "p2_notBigDeal"], label: "Post-Q2" },
      { keys: ["p3_secureSettings", "p3_startSlowly", "p3_fineAsIs"], label: "Post-Q3" },
      { keys: ["p4_morePrivate", "p4_lessPersonal", "p4_noChange"], label: "Post-Q4" },
    ];

    questions.forEach(({ keys, label }) => {
      const total = getQuestionTotal(keys);
      if (total !== totalStudents) {
        errors.push(`${label}: Total responses (${total}) must equal ${totalStudents} students`);
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      if (validateForm()) {
        try {
          const feedbackData = {
            presentationId,
            totalStudents,
            responseCounts,
            classGroup: "college",
          };
          console.log("Feedback Data:", feedbackData);

          const response = await fetch(`/api/secretary/presentation-feedback/${presentationId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ feedbackData }),
          });

          if (!response.ok) throw new Error("Failed to save feedback");

          toast({
            title: "Success",
            description: "Feedback submitted successfully!",
          });

          router.push("/secretary/dashboard");
        } catch (error) {
          console.error("Error saving feedback:", error);
          toast({
            title: "Error",
            description: "Failed to submit feedback. Please try again.",
            variant: "destructive",
          });
        }
      }
    });
  };

  const updateResponse = (key: string, value: number) => {
    setResponseCounts((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(value, totalStudents)),
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Digital Behavior Survey - College Students</h1>
          <p className="text-gray-400 mt-2">
            Total Students: <span className="text-orange-400 font-bold">{totalStudents}</span>
          </p>
        </div>
        <Button onClick={() => router.back()} variant="outline" className="border-gray-600 text-gray-300 hover:bg-red-700">
          ← Back
        </Button>
      </div>

      {validationErrors.length > 0 && (
        <Alert className="mb-6 bg-red-900/20 border-red-700">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300">
            <p className="font-semibold mb-2">Please fix the following errors:</p>
            <ul className="list-disc list-inside space-y-1">
              {validationErrors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <p className="text-gray-300 mb-6">
          Your presence is requested to validate our oral survey process, where Cyber Warriors will record student responses.
          <span className="text-orange-400 font-semibold"> Total for each question must equal {totalStudents}.</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Pre-Survey */}
          <fieldset className="border border-green-700 rounded-lg p-6 bg-green-900/10">
            <legend className="text-lg font-semibold text-green-400 px-3">✅ Pre-Survey (Before Session)</legend>

            <div className="space-y-8 mt-4">
              {/* Q1 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Label className="text-base font-medium text-gray-200 block mb-3">
                  1. Your profile shows your college name/ID --- how do you feel?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Never share it", key: "q1_neverShare" },
                    { label: "Sometimes avoid it", key: "q1_sometimesAvoid" },
                    { label: "I share, feels normal", key: "q1_feelsNormal" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <Label className="text-gray-400 text-sm">{label}</Label>
                      <Input
                        type="number"
                        min="0"
                        max={totalStudents}
                        value={responseCounts[key as keyof typeof responseCounts]}
                        onChange={(e) => updateResponse(key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-2 text-sm ${getQuestionTotal(["q1_neverShare", "q1_sometimesAvoid", "q1_feelsNormal"]) === totalStudents
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  Total: {getQuestionTotal(["q1_neverShare", "q1_sometimesAvoid", "q1_feelsNormal"])} / {totalStudents}
                  {getQuestionTotal(["q1_neverShare", "q1_sometimesAvoid", "q1_feelsNormal"]) === totalStudents && " ✓"}
                </p>
              </div>

              {/* Q2 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Label className="text-base font-medium text-gray-200 block mb-3">
                  2. Message says: "Urgent job! Send OTP." What do you do?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Block/report", key: "q2_blockReport" },
                    { label: "Ignore", key: "q2_ignore" },
                    { label: "Click out of curiosity", key: "q2_clickCuriosity" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <Label className="text-gray-400 text-sm">{label}</Label>
                      <Input
                        type="number"
                        min="0"
                        max={totalStudents}
                        value={responseCounts[key as keyof typeof responseCounts]}
                        onChange={(e) => updateResponse(key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-2 text-sm ${getQuestionTotal(["q2_blockReport", "q2_ignore", "q2_clickCuriosity"]) === totalStudents
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  Total: {getQuestionTotal(["q2_blockReport", "q2_ignore", "q2_clickCuriosity"])} / {totalStudents}
                  {getQuestionTotal(["q2_blockReport", "q2_ignore", "q2_clickCuriosity"]) === totalStudents && " ✓"}
                </p>
              </div>

              {/* Q3 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Label className="text-base font-medium text-gray-200 block mb-3">
                  3. While using UPI/shopping, do you check for lock symbol?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Always", key: "q3_always" },
                    { label: "Sometimes", key: "q3_sometimes" },
                    { label: "Rarely/Never", key: "q3_rarelyNever" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <Label className="text-gray-400 text-sm">{label}</Label>
                      <Input
                        type="number"
                        min="0"
                        max={totalStudents}
                        value={responseCounts[key as keyof typeof responseCounts]}
                        onChange={(e) => updateResponse(key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-2 text-sm ${getQuestionTotal(["q3_always", "q3_sometimes", "q3_rarelyNever"]) === totalStudents
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  Total: {getQuestionTotal(["q3_always", "q3_sometimes", "q3_rarelyNever"])} / {totalStudents}
                  {getQuestionTotal(["q3_always", "q3_sometimes", "q3_rarelyNever"]) === totalStudents && " ✓"}
                </p>
              </div>

              {/* Q4 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Label className="text-base font-medium text-gray-200 block mb-3">
                  4. You post your current location or trip pics?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Keep private", key: "q4_keepPrivate" },
                    { label: "Post carefully", key: "q4_postCarefully" },
                    { label: "Post everything", key: "q4_postEverything" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <Label className="text-gray-400 text-sm">{label}</Label>
                      <Input
                        type="number"
                        min="0"
                        max={totalStudents}
                        value={responseCounts[key as keyof typeof responseCounts]}
                        onChange={(e) => updateResponse(key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-2 text-sm ${getQuestionTotal(["q4_keepPrivate", "q4_postCarefully", "q4_postEverything"]) === totalStudents
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  Total: {getQuestionTotal(["q4_keepPrivate", "q4_postCarefully", "q4_postEverything"])} / {totalStudents}
                  {getQuestionTotal(["q4_keepPrivate", "q4_postCarefully", "q4_postEverything"]) === totalStudents && " ✓"}
                </p>
              </div>
            </div>
          </fieldset>

          {/* Post-Survey */}
          <fieldset className="border border-blue-700 rounded-lg p-6 bg-blue-900/10">
            <legend className="text-lg font-semibold text-blue-400 px-3">✅ Post-Survey (After Session)</legend>

            <div className="space-y-8 mt-4">
              {/* P1 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Label className="text-base font-medium text-gray-200 block mb-3">
                  1. Now, how will you handle job sites/forms?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Verify before sharing", key: "p1_verifyBefore" },
                    { label: "Be extra careful", key: "p1_extraCareful" },
                    { label: "Still unsure", key: "p1_stillUnsure" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <Label className="text-gray-400 text-sm">{label}</Label>
                      <Input
                        type="number"
                        min="0"
                        max={totalStudents}
                        value={responseCounts[key as keyof typeof responseCounts]}
                        onChange={(e) => updateResponse(key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-2 text-sm ${getQuestionTotal(["p1_verifyBefore", "p1_extraCareful", "p1_stillUnsure"]) === totalStudents
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  Total: {getQuestionTotal(["p1_verifyBefore", "p1_extraCareful", "p1_stillUnsure"])} / {totalStudents}
                  {getQuestionTotal(["p1_verifyBefore", "p1_extraCareful", "p1_stillUnsure"]) === totalStudents && " ✓"}
                </p>
              </div>

              {/* P2 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Label className="text-base font-medium text-gray-200 block mb-3">
                  2. Scam messages/calls --- what will you do?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Report & inform others", key: "p2_reportInform" },
                    { label: "Ignore", key: "p2_ignore" },
                    { label: "Not a big deal", key: "p2_notBigDeal" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <Label className="text-gray-400 text-sm">{label}</Label>
                      <Input
                        type="number"
                        min="0"
                        max={totalStudents}
                        value={responseCounts[key as keyof typeof responseCounts]}
                        onChange={(e) => updateResponse(key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-2 text-sm ${getQuestionTotal(["p2_reportInform", "p2_ignore", "p2_notBigDeal"]) === totalStudents
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  Total: {getQuestionTotal(["p2_reportInform", "p2_ignore", "p2_notBigDeal"])} / {totalStudents}
                  {getQuestionTotal(["p2_reportInform", "p2_ignore", "p2_notBigDeal"]) === totalStudents && " ✓"}
                </p>
              </div>

              {/* P3 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Label className="text-base font-medium text-gray-200 block mb-3">
                  3. Ready to improve online payment safety?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Yes, I'll secure settings", key: "p3_secureSettings" },
                    { label: "Will start slowly", key: "p3_startSlowly" },
                    { label: "I'm fine as is", key: "p3_fineAsIs" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <Label className="text-gray-400 text-sm">{label}</Label>
                      <Input
                        type="number"
                        min="0"
                        max={totalStudents}
                        value={responseCounts[key as keyof typeof responseCounts]}
                        onChange={(e) => updateResponse(key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-2 text-sm ${getQuestionTotal(["p3_secureSettings", "p3_startSlowly", "p3_fineAsIs"]) === totalStudents
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  Total: {getQuestionTotal(["p3_secureSettings", "p3_startSlowly", "p3_fineAsIs"])} / {totalStudents}
                  {getQuestionTotal(["p3_secureSettings", "p3_startSlowly", "p3_fineAsIs"]) === totalStudents && " ✓"}
                </p>
              </div>

              {/* P4 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Label className="text-base font-medium text-gray-200 block mb-3">
                  4. How will your posting style change?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "More private now", key: "p4_morePrivate" },
                    { label: "Less personal sharing", key: "p4_lessPersonal" },
                    { label: "No change", key: "p4_noChange" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <Label className="text-gray-400 text-sm">{label}</Label>
                      <Input
                        type="number"
                        min="0"
                        max={totalStudents}
                        value={responseCounts[key as keyof typeof responseCounts]}
                        onChange={(e) => updateResponse(key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-2 text-sm ${getQuestionTotal(["p4_morePrivate", "p4_lessPersonal", "p4_noChange"]) === totalStudents
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  Total: {getQuestionTotal(["p4_morePrivate", "p4_lessPersonal", "p4_noChange"])} / {totalStudents}
                  {getQuestionTotal(["p4_morePrivate", "p4_lessPersonal", "p4_noChange"]) === totalStudents && " ✓"}
                </p>
              </div>
            </div>
          </fieldset>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Survey"
              )}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              variant="outline"
              className="px-8 py-4 border-gray-600 text-gray-300 hover:bg-red-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}