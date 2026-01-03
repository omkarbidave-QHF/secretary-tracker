import express, { Express, Request, Response } from "express";
import prisma from "../utils/prisma";

const app: Express = express();

/**
 * Endpoint for Presentation Details from secretary
 */
// Helper to map frontend class strings to Prisma Enum
const mapClassType = (frontendType: string) => {
    switch (frontendType) {
        case "STD_5": return "Five";
        case "STD_6": return "Six";
        case "STD_7": return "Seven";
        case "STD_8": return "Eight";
        case "STD_9": return "Nine";
        case "STD_10": return "Ten";
        case "STD_11": return "Eleven";
        case "STD_12": return "Twelve";
        case "COLLEGE": return "SrCollege";
        default: return "Five"; // Default fallback or handle error
    }
};

app.post("/presentation", async (request: Request, response: Response) => {
    try {
        const {
            cyberWarriors, // Team name
            schoolName,
            address,
            phoneNo,
            emailId,
            principalName,
            city,
            taluka,
            district,
            medium,
            presentationDate,
            classGroup,
            studentData, // Array of classType, boysCount, GirlsCount
            institutionId, // Received but not used in schema currently
        } = request.body;

        if (!cyberWarriors || !schoolName || !presentationDate || !studentData || !classGroup) {
            return response.status(400).send("Missing required fields");
        }


        // Mapping frontend schema to backend models
        const newPresentation = await prisma.presentation.create({
            data: {
                group: {
                    create: {
                        groupName: cyberWarriors,
                    },
                },
                schoolName,
                schoolContact: phoneNo,
                principalName,
                city,
                taluka,
                district,
                medium,
                date: new Date(presentationDate),
                classType: classGroup,
                studentsClass: {
                    create: studentData.map((item: any) => ({
                        classType: mapClassType(item.classType),
                        boysCount: item.boysCount,
                        GirlsCount: item.GirlsCount,
                    })),
                },
            },
            include: {
                group: true,
            },
        });

        return response.status(201).json(newPresentation);
    } catch (error) {
        console.error("Presentation creation error:", error);
        return response.status(500).send("Internal Server Error");
    }
});

/**
 *  Presentation Feedback
*/
app.patch("/presentation-feedback/:id", async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { feedbackData } = request.body;

        const existing = await prisma.presentation.findUnique({ where: { id } });
        if (!existing) {
            return response.status(404).send("Presentation not found");
        }

        const updated = await prisma.presentation.update({
            where: { id },
            data: {
                feedback: JSON.stringify(feedbackData),
            },
        });

        return response.status(200).json(updated);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
});

/**
 * Endpoint for Impact Activity Details
 */
app.post("/impact-activity", async (request: Request, response: Response) => {
    try {
        const {
            cyberWarriors,
            organization,
            leaderName,
            messagePropagated,
            date,
            activityDuration,
            location,
            participants,
            resourceInvolved,
            socialLinks,
            mediaLinks,
            remarks,
        } = request.body;

        if (!cyberWarriors || !organization || !date || !participants) {
            return response.status(400).send("Missing required fields");
        }

        const impact = await prisma.impactActivity.create({
            data: {
                group: {
                    create: {
                        groupName: cyberWarriors,
                    },
                },
                organizationName: organization,
                leaderName,
                messagePropagated,
                date: new Date(date),
                activityDurationMin: parseInt(activityDuration),
                location,
                participantsCount: parseInt(participants),
                resourcesInvolved: resourceInvolved,
                socialMediaLinks: socialLinks,
                mediaLinks,
                remarks,
            },
        });

        return response.status(201).json(impact);
    } catch (error) {
        console.error("Impact activity create error:", error);
        return response.status(500).send("Internal Server Error");
    }
});

/**
 * Handle Impact Feedback Updates
 */
app.patch("/impact-feedback/:id", async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { feedbackData } = request.body;

        const existing = await prisma.impactActivity.findUnique({ where: { id } });
        if (!existing) {
            return response.status(404).send("Impact activity not found");
        }

        const updated = await prisma.impactActivity.update({
            where: { id },
            data: {
                feedback: JSON.stringify(feedbackData),
            },
        });

        return response.status(200).json(updated);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
});

/**
 * Endpoint for Mass Activity Reports
 */
app.post("/mass-activity", async (request: Request, response: Response) => {
    try {
        const {
            activityName,
            activityDescription,
            date,
            duration,
            location,
            participants,
            stakeholders,
            socialMediaLinks,
            mediaLinks,
            institutionId,
        } = request.body;

        if (!institutionId || !activityName || !date) {
            return response.status(400).send("Missing required fields (institutionId is mandatory)");
        }

        const massActivity = await prisma.mass_Activity.create({
            data: {
                activityName,
                activityDescription,
                date: new Date(date),
                duration,
                location,
                participantsCount: parseInt(participants),
                stakeholders,
                socialMediaLinks: socialMediaLinks || [],
                mediaLinks: mediaLinks || [],
                institution: {
                    connect: { institution_id: institutionId },
                },
            },
        });

        return response.status(201).json(massActivity);
    } catch (error) {
        console.error("Mass activity create error:", error);
        return response.status(500).send("Internal Server Error");
    }
});

export default app;
