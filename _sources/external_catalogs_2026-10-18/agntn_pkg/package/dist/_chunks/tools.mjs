import { assetsTool, authorTool, authorsTool, balanceTool, collectionsTool, eligibilityTool, facts, hintsTool, listTool, showTool, solverTool, solversTool, stagesTool, statsTool, verifyTool, watchTool } from "./tool-operations.mjs";
import { Type, defineTool } from "@agntn/tools";
const { chains, parameters, statuses, techniques } = facts;
const puzzleId = Type.String(parameters.id);
function closed(properties) {
	return Type.Object(properties, { additionalProperties: false });
}
function described(tool) {
	return {
		name: tool.name,
		title: tool.title,
		description: tool.description,
		snippet: tool.promptSnippet,
		guidelines: tool.promptGuidelines,
		effect: "read",
		openWorld: tool.openWorld
	};
}
const statsToolDefinition = defineTool({
	...described(facts.tools.stats),
	input: Type.Object({}),
	cli: { description: "Print aggregate statistics for every collection" },
	execute: () => statsTool()
});
const collectionsToolDefinition = defineTool({
	...described(facts.tools.collections),
	input: Type.Object({}),
	cli: { description: "List every registered collection" },
	execute: () => collectionsTool()
});
const authorsToolDefinition = defineTool({
	...described(facts.tools.authors),
	input: Type.Object({}),
	execute: () => authorsTool()
});
const authorToolDefinition = defineTool({
	...described(facts.tools.author),
	input: closed({ key: Type.String(parameters.author) }),
	execute: (params) => authorTool(params.key)
});
const solversToolDefinition = defineTool({
	...described(facts.tools.solvers),
	input: Type.Object({}),
	execute: () => solversTool()
});
const solverToolDefinition = defineTool({
	...described(facts.tools.solver),
	input: closed({ key: Type.String(parameters.solver) }),
	execute: (params) => solverTool(params.key)
});
const showToolDefinition = defineTool({
	...described(facts.tools.show),
	input: closed({
		id: puzzleId,
		allTransactions: Type.Optional(Type.Boolean(parameters.allTransactions))
	}),
	execute: (params) => showTool(params.id, params.allTransactions)
});
const hintsToolDefinition = defineTool({
	...described(facts.tools.hints),
	input: closed({ id: puzzleId }),
	execute: (params) => hintsTool(params.id)
});
const stagesToolDefinition = defineTool({
	...described(facts.tools.stages),
	input: closed({ id: puzzleId }),
	execute: (params) => stagesTool(params.id)
});
const assetsToolDefinition = defineTool({
	...described(facts.tools.assets),
	input: closed({
		id: puzzleId,
		file: Type.Optional(Type.String(parameters.file))
	}),
	execute: (params) => assetsTool(params.id, params.file)
});
const filters = {
	address: Type.Optional(Type.String(parameters.address)),
	collection: Type.Optional(Type.String(parameters.collection)),
	chain: Type.Optional(Type.Enum(chains, parameters.chain)),
	status: Type.Optional(Type.Enum(statuses, parameters.status)),
	technique: Type.Optional(Type.Enum(techniques, parameters.technique)),
	withPubkey: Type.Optional(Type.Boolean(parameters.withPubkey))
};
const listToolDefinition = defineTool({
	...described(facts.tools.list),
	input: closed({
		...filters,
		limit: Type.Optional(Type.Integer(parameters.limit)),
		offset: Type.Optional(Type.Integer(parameters.offset))
	}),
	execute: (params) => listTool(params)
});
const verifyToolDefinition = defineTool({
	...described(facts.tools.verify),
	input: closed({
		id: Type.Optional(puzzleId),
		...filters
	}),
	execute: (params) => verifyTool(params)
});
const balanceToolDefinition = defineTool({
	...described(facts.tools.balance),
	input: closed({
		id: puzzleId,
		apiKey: Type.Optional(Type.String(parameters.apiKey))
	}),
	execute: (params) => balanceTool(params.id, params.apiKey)
});
const watchToolDefinition = defineTool({
	...described(facts.tools.watch),
	input: closed({
		id: puzzleId,
		since: Type.Optional(Type.String(parameters.since)),
		apiKey: Type.Optional(Type.String(parameters.apiKey))
	}),
	execute: (params) => watchTool(params.id, params.since, params.apiKey)
});
const eligibilityToolDefinition = defineTool({
	...described(facts.tools.eligibility),
	input: closed({
		query: Type.String(parameters.query),
		chain: Type.Optional(Type.Enum(chains, parameters.addressChain)),
		apiKey: Type.Optional(Type.String(parameters.apiKey))
	}),
	execute: (params) => eligibilityTool(params.query, params.chain, params.apiKey)
});
const publicVerifyToolDefinition = defineTool({
	...described(facts.publicTools.verify),
	input: closed({ id: puzzleId }),
	execute: (params) => verifyTool(params.id)
});
const puzzlesTools = [
	statsToolDefinition,
	collectionsToolDefinition,
	authorsToolDefinition,
	authorToolDefinition,
	solversToolDefinition,
	solverToolDefinition,
	showToolDefinition,
	hintsToolDefinition,
	stagesToolDefinition,
	assetsToolDefinition,
	listToolDefinition,
	verifyToolDefinition,
	balanceToolDefinition,
	watchToolDefinition,
	eligibilityToolDefinition
];
function listSummary(args) {
	return [
		args["address"] ?? args["collection"] ?? args["chain"] ?? "all",
		args["status"],
		args["technique"]
	].filter((part) => part !== void 0).map((part) => typeof part === "string" ? part : JSON.stringify(part)).join(" ");
}
const publicPuzzlesTools = puzzlesTools.map((tool) => tool === verifyToolDefinition ? publicVerifyToolDefinition : tool);
const callSummaries = {
	[facts.tools.author.name]: (args) => args["key"],
	[facts.tools.solver.name]: (args) => args["key"],
	[facts.tools.show.name]: (args) => args["id"],
	[facts.tools.hints.name]: (args) => args["id"],
	[facts.tools.stages.name]: (args) => args["id"],
	[facts.tools.assets.name]: (args) => args["file"] ?? args["id"],
	[facts.tools.list.name]: listSummary,
	[facts.tools.verify.name]: (args) => args["id"] ?? listSummary(args),
	[facts.tools.balance.name]: (args) => args["id"],
	[facts.tools.watch.name]: (args) => args["id"],
	[facts.tools.eligibility.name]: (args) => args["query"]
};
export { assetsToolDefinition, authorToolDefinition, authorsToolDefinition, balanceToolDefinition, callSummaries, collectionsToolDefinition, eligibilityToolDefinition, hintsToolDefinition, listToolDefinition, publicPuzzlesTools, publicVerifyToolDefinition, puzzlesTools, showToolDefinition, solverToolDefinition, solversToolDefinition, stagesToolDefinition, statsToolDefinition, verifyToolDefinition, watchToolDefinition };
