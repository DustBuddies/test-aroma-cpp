"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function activate(context) {
    let disposable = vscode.commands.registerTextEditorCommand('aroma-cpp.suggestRefactorings', async (textEditor) => {
        const [model] = await vscode.lm.selectChatModels({ vendor: 'copilot', family: 'gpt-4o' });
        let messages = [];
        try {
            let instruction_message = vscode.LanguageModelChatMessage.User(
            //'You are a refactoring helper. Your job is to suggest applications of the extract method refactoring technique to reduce the cyclomatic complexity of the code to be below 5 per function. Your suggestions must be in the following format: (file_name, function_name, start_line, end_line, name_extracted_function). Return only the suggestions.'
            'You are a refactoring assistant. Your task is to suggest one or more applications of the extract method refactoring technique to reduce the cyclomatic complexity of functions. The cyclomatic complexity of the refactored code should be lower than 5. For each suggestion, provide the starting and ending line numbers of the code to be extracted, and the name of the new extracted function. Format your suggestions as follows: (start_line, end_line, name_extracted_function). Return only the suggestions.');
            // Path to the high_cc.txt file
            const highCCFilePath = 'c:/Users/20202715/OneDrive/Documenten/Graduation Project/Test/aroma-cpp/src/high_cc.txt';
            // Read the high_cc.txt file
            const highCCContent = fs.readFileSync(highCCFilePath, 'utf8');
            // Parse the content to extract file paths and function names
            const highCCEntries = highCCContent.match(/\("(.*?)",\s*"(.*?)"\)/g)?.map(entry => {
                const match = entry.match(/\("(.*?)",\s*"(.*?)"\)/);
                return match ? { filePath: match[1], functionName: match[2] } : null;
            }).filter(Boolean);
            // Open each file and extract C++ function names and bodies
            for (const entry of highCCEntries) {
                if (fs.existsSync(entry.filePath)) {
                    const document = await vscode.workspace.openTextDocument(entry.filePath);
                    await vscode.window.showTextDocument(document, { preview: false });
                    const documentText = document.getText();
                    // Regex pattern to match C++ function declarations and bodies
                    const functionPattern = /(?:[\w:\*\&<>]+\s+)+([\w:~]+)\s*\(([^)]*)\)\s*(const)?\s*\{([\s\S]*?\})/gm;
                    const matchedFunctions = [...documentText.matchAll(functionPattern)].map(match => {
                        const name = match[1];
                        const body = match[4];
                        return name && body ? { name, body: body.trim() } : null;
                    }).filter(Boolean);
                    // Compare function names from high_cc.txt to those found in the file
                    const overlappingFunction = matchedFunctions.find(func => func.name === entry.functionName);
                    if (overlappingFunction) {
                        messages.push(`${overlappingFunction.body}`);
                    }
                }
                else {
                    vscode.window.showWarningMessage(`File not found: ${entry.filePath}`);
                }
            }
            const chatResponses = [];
            try {
                for (const message of messages) {
                    const response = await model.sendRequest([instruction_message, vscode.LanguageModelChatMessage.User(message)], {}, new vscode.CancellationTokenSource().token);
                    chatResponses.push(response);
                }
            }
            catch (err) {
                if (err instanceof vscode.LanguageModelError) {
                    console.log(err.message, err.code, err.cause);
                }
                else {
                    throw err;
                }
                return;
            }
            // Write the response to RefactoringSuggestions.txt
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '.';
            const filePath = path.join(workspaceFolder, 'RefactoringSuggestions.txt');
            try {
                let output = '';
                for (const chatResponse of chatResponses) {
                    for await (const fragment of chatResponse.text) {
                        output += fragment;
                    }
                    output += '\n\n';
                }
                fs.writeFileSync(filePath, output, 'utf8');
                vscode.window.showInformationMessage('Refactoring suggestions saved to RefactoringSuggestions.txt');
            }
            catch (err) {
                vscode.window.showErrorMessage(`Error writing to file: ${err.message}`);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
            else {
                vscode.window.showErrorMessage('An unexpected error occurred.');
            }
        }
    });
    context.subscriptions.push(disposable);
}
//# sourceMappingURL=extension.js.map