import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { sql, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

export const SUGGESTION_STATUS = {
	POSTED: "POSTED",
	ACCEPTED: "ACCEPTED",
	REJECTED: "REJECTED",
} as const satisfies Record<string, string>;

export type SuggestionStatus =
	typeof SUGGESTION_STATUS[keyof typeof SUGGESTION_STATUS];
export type UpdatedSuggestionStatus = Exclude<SuggestionStatus, "POSTED">;

const SUGGESTION_STATUS_VALUES = Object.values(SUGGESTION_STATUS) as [
	"POSTED",
	"ACCEPTED",
	"REJECTED",
];

export const Suggestion = sqliteTable("suggestion", {
	id: int("id").primaryKey({ autoIncrement: true }).notNull(),

	title: text("title").notNull(),
	description: text("description"),

	guildId: text("guildId").notNull(),
	channelId: text("channelId").notNull(),
	messageId: text("messageId").notNull(),
	userId: text("userId").notNull(),

	status: text("status", { enum: SUGGESTION_STATUS_VALUES })
		.default("POSTED")
		.notNull(),
	statusReason: text("statusReason"),
	statusUserId: text("statusUserId"),

	upvotedBy: text("upvotedBy"),
	downvotedBy: text("downvotedBy"),

	updatedAt: int("updatedAt", { mode: "timestamp" })
		.default(sql`(strftime('%s', 'now'))`)
		.notNull(),
	createdAt: int("createdAt", { mode: "timestamp" })
		.default(sql`(strftime('%s', 'now'))`)
		.notNull(),
});

export type SuggestionSelect = InferSelectModel<typeof Suggestion>;
export type SuggestionInsert = InferInsertModel<typeof Suggestion>;