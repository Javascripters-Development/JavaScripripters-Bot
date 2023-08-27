import { hyperlink as djsHyperlink, hideLinkEmbed } from "discord.js";
import db from "./db.ts";
import { Config } from "./schemas/config.ts";
import { sql, eq } from "drizzle-orm";
/**
 * Casts a value into an array.
 *
 * @example
 * castArray(1) // [1]
 * castArray(['Hello', 'world']) // ['Hello', 'world']
 */
// biome-ignore lint/suspicious/noExplicitAny: can be an array of any type
export const castArray = <T>(value: T): T extends any[] ? T : T[] => {
	// biome-ignore lint/suspicious/noExplicitAny: can be an array of any type
	return (Array.isArray(value) ? value : [value]) as T extends any[] ? T : T[];
};

export const getConfig = db
	.select()
	.from(Config)
	.where(eq(Config.id, sql.placeholder("guildId")))
	.prepare();

/**
 * Formats the content and the URL into a masked URL without embed.
 * @see {@link djsHyperlink}.
 */
export const hyperlink = <C extends string, U extends string>(
	content: C,
	url: U,
) => djsHyperlink(content, hideLinkEmbed(url));

/**
 * Capitalizes the first letter of a string.
 *
 * @example
 * capitalizeFirstLetter('hello world') // "Hello world"
 */
export const capitalizeFirstLetter = <T extends string>(
	value: T,
): Capitalize<T> => (value[0].toUpperCase() + value.slice(1)) as Capitalize<T>;
