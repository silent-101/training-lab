import type { Model } from "mongoose";
import mongoose, { Schema, model } from "mongoose";
type GameInfo = {
	name: string;
	category: string;
	description: string;
	image: string;
};

const GameInfoSchema = new Schema<GameInfo>(
	{
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
);

export const GameInfoModel =
	typeof mongoose.models.GameInfo !== "undefined"
		? (mongoose.models.GameInfo as Model<GameInfo>)
		: model<GameInfo>("GameInfo", GameInfoSchema);
