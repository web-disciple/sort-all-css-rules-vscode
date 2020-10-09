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
        // Get the css within the selection
        let css = document.getText(selection);

        // Format property css
        let reordered: Array<any> = [];
        let formated: any = css;
        formated = formated.replace(/(\r\n|\n|\r)/gm, "");
        formated = formated.replace(/\s/g, "");
        formated = formated.split(new RegExp("(?<={)(.*?)(?=})"));
        formated.forEach((element: any, index: number) => {
          let reorderedElement: any = element;
          if ((index + 1) % 2 === 0) {
            reorderedElement = reorderedElement.split(";");
            reorderedElement = reorderedElement.sort();
            reorderedElement = reorderedElement.join(";");
            reorderedElement = reorderedElement.substring(1);
          }
          reordered.push(reorderedElement);
        });
        let finalReordered = reordered.join("");

        // display
        editor.edit((editBuilder) => {
          editBuilder.replace(selection, finalReordered);
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}
