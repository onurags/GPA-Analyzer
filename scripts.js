function showForm(type) {
    if (type === 'sgpa') {
        document.getElementById('sgpaForm').classList.add('active');
        document.getElementById('cgpaForm').classList.remove('active');
    } else {
        document.getElementById('cgpaForm').classList.add('active');
        document.getElementById('sgpaForm').classList.remove('active');
    }
}

function calculateSGPA() {
let totalCredits = 0;
let totalGradePoints = 0;

// Loop through each input container and calculate total credits and grade points
for (let i = 1; i <= 15; i++) {
const credits = parseFloat(document.getElementById(`sub${i}-credits`).value);
const grade = parseFloat(document.getElementById(`sub${i}-grade`).value);

// Check if both credits and grade are valid numbers
if (!isNaN(credits) && !isNaN(grade)) {
    totalCredits += credits;
    totalGradePoints += credits * grade;
}
}

// Calculate SGPA
const sgpa = (totalGradePoints / totalCredits) ;

// Display SGPA in a pop-up box format
const modal = document.getElementById("modal");
const sgpaResult = document.getElementById("sgpaResult");
sgpaResult.innerHTML = sgpa.toFixed(2);
modal.style.display = "block";
}


function calculateCGPA() {
let totalSGPA = 0;

let numberOfSemesters = 0; // Variable to count the number of semesters entered

for (let i = 1; i <= 8; i++) {
const sgpa = parseFloat(document.getElementById(`sem${i}-sgpa`).value);

// Check if SGPA is a valid number
if (!isNaN(sgpa)) {
totalSGPA += sgpa;
numberOfSemesters++; // Increment the count of semesters
}
}

// Check if any SGPA values were entered
if (numberOfSemesters > 0) {
// Calculate CGPA
const cgpa = totalSGPA / numberOfSemesters;

// Display CGPA in modal
const modal = document.getElementById("modal2");
const cgpaResult = document.getElementById("cgpaResult"); // Fixed ID here
cgpaResult.innerHTML = cgpa.toFixed(2); // Fixed variable name here
modal.style.display = "block";
} else {
// Display error message or handle empty input case
console.log("No SGPA values entered");
}

// // Display CGPA in modal
// const modal = document.getElementById("modal2");
// const cgpaResult = document.getElementById("cgpaResult"); // Fixed ID here
// cgpaResult.innerHTML = cgpa.toFixed(2); // Fixed variable name here
// modal.style.display = "block";
}
function closeModal() {
const modal = document.getElementById("modal");
modal.style.display = "none";
}
function closeModal2() {
const modal2 = document.getElementById("modal2"); // Fixed variable name here
modal2.style.display = "none"; // Fixed variable name here
}