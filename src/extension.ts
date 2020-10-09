// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from "vscode";

// // this method is called when your extension is activated
// // your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {
//   // Use the console to output diagnostic information (console.log) and errors (console.error)
//   // This line of code will only be executed once when your extension is activated
//   console.log(
//     'Congratulations, your extension "sort-all-css-rules-in-css-files" is now active!'
//   );

//   // The command has been defined in the package.json file
//   // Now provide the implementation of the command with registerCommand
//   // The commandId parameter must match the command field in package.json
//   let disposable = vscode.commands.registerCommand(
//     "sort-all-css-rules-in-css-files.sorting",
//     () => {
//       const editor: any = vscode.window.activeTextEditor;

//       if (editor) {
//         let filePath = editor._documentData._document.fileName;
//         let fileExtension: string = filePath
//           .split(".")
//           [filePath.split(".").length - 1].toLowerCase();
//         console.log(fileExtension);
//         if (fileExtension === "css") {
//           let document = editor.document;
// 		  let documentText: string = document.getText();
// 		  editor.edit(editBuilder => {
// 			  console.log(editBuilder);
// 		  })
//           documentText = documentText.replace(/(\r\n|\n|\r)/gm, "");
//           documentText = documentText.replace(/\s/g, "");
//           let documentFormated: any = documentText.split("{");
//           //   let documentFormated: any = documentText.split(new RegExp("(?<=\{)(.*?)(?=\})"));
//           console.log(documentFormated);
//           vscode.window.showInformationMessage(
//             "All css in the files has been sorted !"
//           );
//         } else {
//           vscode.window.showInformationMessage("You need css file.");
//         }
//       }
//     }
//   );

//   context.subscriptions.push(disposable);
// }

// // this method is called when your extension is deactivated
// export function deactivate() {}

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
