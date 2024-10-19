const problems = {
  1: {
    commitMessage: "Commit 1",
    changedFiles: [
      "src/two_sum.js",
      "src/utils.js",
      "src/helpers.js",
      "src/data_structures.js",
      "src/array_operations.js",
      "src/index.html",
      "src/styles.css",
      "src/config.json",
      "src/package.json",
      "src/README.md"
    ],
    testFiles: [
      "tests/two_sum.test.js",
      "tests/utils.test.js",
      "tests/helpers.test.js"
    ]
  },
  2: {
    commitMessage: "Commit 2",
    changedFiles: [
      "src/reverse_integer.js",
      "src/utils.js",
      "src/error_handling.js",
      "src/logger.js",
      "src/reverse_integer_service.js",
      "src/styles.css",
      "src/manifest.json",
      "src/index.html",
      "src/package-lock.json",
      "src/.env"
    ],
    testFiles: [
      "tests/reverse_integer.test.js",
      "tests/error_handling.test.js",
      "tests/logger.test.js"
    ]
  },
  3: {
    commitMessage: "Commit 3",
    changedFiles: [
      "src/palindrome_number.js",
      "src/utils.js",
      "src/data_parser.js",
      "src/data_structures.js",
      "src/app.js",
      "src/routes.js",
      "src/server.js",
      "src/index.html",
      "src/styles.css",
      "src/Dockerfile"
    ],
    testFiles: [
      "tests/palindrome_number.test.js",
      "tests/data_parser.test.js",
      "tests/server.test.js"
    ]
  }
};

// Dummy content generator for files
const dummyFileContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat orci ut nulla placerat, nec cursus orci rhoncus. Etiam sed erat urna.
Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin vel ligula dui. 
Duis fringilla vel nisl a blandit. Vivamus mollis efficitur purus, non lacinia purus facilisis sed.`.repeat(10);

// Function to display the selected problem's commit details
function selectProblem(problemId) {
  const problem = problems[problemId];
  
  // Update commit message
  document.getElementById("commit-message").innerText = problem.commitMessage;

  // Display changed files
  const filesChangedList = document.getElementById("files-changed");
  filesChangedList.innerHTML = ""; // Clear previous entries
  
  problem.changedFiles.forEach(file => {
    const listItem = document.createElement("li");
    listItem.innerText = file;
    listItem.onclick = () => previewFile(listItem, file);
    filesChangedList.appendChild(listItem);
  });

  const testFilesList = document.getElementById("test-files");

testFilesList.innerHTML = ""; // Clear previous entries

// Assuming problem.testFiles is an array of test files
problem.testFiles.forEach(file => {
  const listItem = document.createElement("li");
  listItem.innerText = file;
  
  // Create preview and explanation container for each file
  const previewExplanation = document.createElement("div");
  previewExplanation.classList.add("preview-explanation");
  
  // Create Preview Box (now renamed to preview-box1)
  const previewBox = document.createElement("div");
  previewBox.classList.add("preview-box1");
  previewBox.innerHTML = `
    
    <div class="preview-content">
      <p>Preview content for file: ${file}</p>
      <p>Preview content for file: ${file}</p>
      <p>Preview content for file: ${file}</p>

      <p>Preview content for file: ${file}</p>
      <p>Preview content for file: ${file}</p>
      <p>Preview content for file: ${file}</p>
    </div>
  `;
  
  // Create Explanation Box
  const explanationBox = document.createElement("div");
  explanationBox.classList.add("explanation-box");
  explanationBox.innerHTML = `
    
    <div class="explanation-content">
      <p>Explanation for file: ${file}</p>
      <p>This section can include details or instructions related to the file.</p>
    </div>
  `;
  
  // Append both boxes to the previewExplanation container
  previewExplanation.appendChild(previewBox);
  previewExplanation.appendChild(explanationBox);
  
  // Append the previewExplanation section after the list item
  listItem.appendChild(previewExplanation);
  
  // Toggle visibility on click
  listItem.onclick = () => {
    // Toggle the display of the previewExplanation section
    if (previewExplanation.style.display === "none" || previewExplanation.style.display === "") {
      previewExplanation.style.display = "flex"; // Show if hidden
    } else {
      previewExplanation.style.display = "none"; // Hide if visible
    }
  };
  
  testFilesList.appendChild(listItem);
});



  const subNav = document.querySelector(".sub-nav");
  subNav.style.position = "relative";
  subNav.style.top = "-66px";

}

// Function to display file content preview
function previewFile(listItem, fileName) {
  // Check if the preview box already exists
  const existingPreview = listItem.querySelector(".preview-box");
  
  if (existingPreview) {
    // If the preview box is already there, remove it (close the preview)
    existingPreview.remove();
  } else {
    // If there is no preview, create one
    const previewBox = document.createElement("div");
    previewBox.classList.add("preview-box");

    // Add the file name as a heading
    // const previewHeading = document.createElement("h3");
    // previewHeading.innerText = "Preview\n" + fileName; // Updated line to put file name on next line
    // previewBox.appendChild(previewHeading);

    // Add the file content
    const fileContent = document.createElement("pre");
    fileContent.innerText = dummyFileContent;
    fileContent.style.maxHeight = "300px"; // Set the height of the preview box
    fileContent.style.overflowY = "scroll"; // Make the content scrollable
    previewBox.appendChild(fileContent);

    // Insert the preview box directly after the clicked file item
    listItem.appendChild(previewBox);
  }
}


  
  