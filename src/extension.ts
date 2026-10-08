import * as vscode from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    Executable
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('zenc');
    const serverPath = config.get<string>('serverPath') || 'zc';

    const run: Executable = {
        command: serverPath,
        args: ['lsp'],
        options: {
            env: process.env
        }
    };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ServerOptions = {
        run,
        debug: run
    };

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        // Register the server for Zen C documents
        documentSelector: [{ scheme: 'file', language: 'zenc' }]
    };

    // Create the language client and start the client.
    client = new LanguageClient(
        'zenc',
        'Zen C Language Server',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
