import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "sort-all-css-rules-in-css-files.sorting",
    function () {
      // Get the active text editor
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        // Gets the CSS within the selection
        let css = document.getText(selection);

        // Formats CSS properties
        let reordered: Array<any> = [];
        let formatted: any = css;
        formatted = formatted.replace(/(\r\n|\n|\r)/gm, "");
        formatted = formatted.replace(/\s/g, "");
        formatted = formatted.split(new RegExp("(?<={)(.*?)(?=})"));

        // Orders CSS properties alphabetically
        formatted.forEach((element: any, index: number) => {
          if ((index + 1) % 2 === 0) {
            element = element.split(";").sort().join(";").substring(1);
          }
          reordered.push(element);
        });

        const reorderedSelection = reordered.join("");

        // Injects reordered properties in the editor
        editor.edit((editBuilder) => {
          editBuilder.replace(selection, reorderedSelection);
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}
