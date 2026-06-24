import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export function errorMiddleware(
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.error(error);

	if (error instanceof AppError) {
		console.log(error.statusCode, "App error occured")
		res.status(error.statusCode).json({
			status: "error",
			message: error.message,
		});
		return;
	}
	res.status(500).json({
		status: "error",
		message: "Internal Server Error",
	});
}
