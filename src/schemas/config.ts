import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
export const Config = sqliteTable("guildConfig", {
	id: text("guildId").primaryKey().notNull(),
	gatewayChannel: text("gatewayChannel"),

	gatewayJoinTitle: text("gatewayJoinTitle"),
	gatewayJoinContent: text("gatewayJoinContent"),

	gatewayLeaveTitle: text("gatewayLeaveTitle"),
	gatewayLeaveContent: text("gatewayLeaveContent"),
});
export type ConfigSelect = InferSelectModel<typeof Config>;
export type ConfigInsert = InferInsertModel<typeof Config>;
