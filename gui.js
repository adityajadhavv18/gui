const baseURL = "http://127.0.0.1:8000"; // Base URL for API

// Fetch all commits from the API
async function fetchCommits() {
  try {
    const response = await fetch(`${baseURL}/commits`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching commits:", error);
  }
}

// Fetch changed files for a specific commit by its SHA
async function fetchChangedFiles(commitSha) {
  try {
    const response = await fetch(
      `${baseURL}/changed-files/?commit_sha=${commitSha}`
    );
    const data = await response.json();
    return data.changed_files;
  } catch (error) {
    console.error("Error fetching changed files:", error);
  }
}

// Call the process-changed-files API
async function processChangedFiles(changedFiles) {
  try {
    const response = await fetch(`${baseURL}/process-changed-files/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ changed_files: changedFiles }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error processing changed files:", error);
  }
}

// Display commits on the sidebar
async function displayCommits() {
  const commits = await fetchCommits();
  const commitList = document.getElementById("problem-list");
  commitList.innerHTML = ""; // Clear existing items

  commits.forEach((commit, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = commit.commit_message;
    listItem.onclick = () =>
      selectCommit(commit.commit_id, commit.commit_message);
    commitList.appendChild(listItem);
  });
}

// Select and display a commit's details
async function selectCommit(commitId, commitMessage) {
  // Update commit message
  document.getElementById("commit-message").innerText = commitId;

  // Fetch and display changed files
  const changedFiles = await fetchChangedFiles(commitId);
  displayFiles(changedFiles, "files-changed");

  // Process the changed files and update the view with test files
  const processedData = await processChangedFiles(changedFiles);
  if (processedData) {
    displayProcessedFiles(processedData);
  }
}

function displayProcessedFiles(processedData) {
  const testFilesList = document.getElementById("test-files");
  testFilesList.innerHTML = ""; // Clear previous entries

  processedData.forEach((file) => {
    const listItem = document.createElement("li");
    listItem.innerText = file.test_file_path;
    listItem.onclick = () =>
      previewFile(listItem, file.test_file_path, file.test_file_content);
    testFilesList.appendChild(listItem);
  });
  const subNav = document.querySelector(".sub-nav");
  subNav.style.position = "relative";
  subNav.style.top = "-30px";
}

// Helper function to display files in a given section
function displayFiles(files, elementId) {
  const filesList = document.getElementById(elementId);
  filesList.innerHTML = ""; // Clear previous entries

  for (const [fileName, fileDetails] of Object.entries(files)) {
    const listItem = document.createElement("li");
    listItem.innerText = fileName;
    listItem.onclick = () =>
      previewFile(listItem, fileName, fileDetails.file_content);
    filesList.appendChild(listItem);
  }
}

// Function to display file content preview
function previewFile(listItem, fileName, fileContent) {
  const existingPreview = listItem.querySelector(".preview-box");

  if (existingPreview) {
    existingPreview.remove(); // Close the preview if it already exists
  } else {
    const previewBox = document.createElement("div");
    previewBox.classList.add("preview-box");

    const fileContentElement = document.createElement("pre");
    fileContentElement.innerText = fileContent || "No content available"; // Display file content or fallback message
    fileContentElement.style.maxHeight = "300px"; // Set max height for the preview box
    fileContentElement.style.overflowY = "scroll"; // Make it scrollable if content is long
    previewBox.appendChild(fileContentElement);

    listItem.appendChild(previewBox); // Append preview box to the list item
  }
}

// Initialize and load commits when the page loads
document.addEventListener("DOMContentLoaded", () => {
  displayCommits();
});
