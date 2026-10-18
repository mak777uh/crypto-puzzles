import { serverInfo } from "./_chunks/server-info.mjs";
import { publicPuzzlesTools, puzzlesTools } from "./_chunks/tools.mjs";
import { ToolInputError, indexTools, invokeTool, wireSchema } from "@agntn/tools";
import { createMcpServer as createMcpServer$1, errorResult, toolAnnotations } from "@agntn/tools/mcp";
const toolListings = publicPuzzlesTools.map((tool) => ({
	name: tool.name,
	title: tool.title,
	description: tool.description,
	inputSchema: {
		...wireSchema(tool),
		type: "object"
	},
	annotations: toolAnnotations(tool)
}));
const toolsByName = indexTools(publicPuzzlesTools);
async function callTool(name, args) {
	const tool = toolsByName.get(name);
	if (tool === void 0) return errorResult(`Unknown puzzles tool: ${JSON.stringify(name)}`);
	try {
		return { content: (await invokeTool(tool, args)).content };
	} catch (error) {
		if (error instanceof ToolInputError) return errorResult(...error.lines);
		return errorResult(`${tool.name} failed: ${error instanceof Error ? error.message : String(error)}`);
	}
}
function createMcpServer() {
	return createMcpServer$1(serverInfo, puzzlesTools);
}
export { callTool, createMcpServer, toolListings };
