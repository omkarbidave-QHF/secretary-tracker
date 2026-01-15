import express, { Express, Request, Response } from "express";
import prisma from "../utils/prisma";


const app: Express = express()

// Specify your route here between the `` (backticks)
app.post(`/`, async function(request: Request, response:Response){
  try {
    const { id, accountNumber, ifscCode, bankName, branchName } = request.body;

    if( !id|| !accountNumber|| !ifscCode|| !bankName|| !branchName){
      return response.status(400).send("Missing Fields")
    }

    const checkIfSecretaryExist = await prisma.secretary.findUnique({
      where: {
        id
      }, select: {
        name:true,
      }
    })

    if(!checkIfSecretaryExist){
      return response.status(404).send("Secretary Doesn't Exist")
    }

   await prisma.secretary.update({
      where: { id },
      data: {
        bankAccNumber: accountNumber,
        ifscCode,
        bankName,
        bankBranch: branchName,
      },
    });
    return response.status(200).send("Secretary Updated Successfully")
  } catch (error) {
      return response.status(500).send("Internal Server Error")
  }
})

export default app;
