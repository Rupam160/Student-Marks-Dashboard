let students = ["Alice", "Bob", "Charlie"];
let marks = [85, 90, 78];
let selecting = false;

function getBarColor(mark) {
    return mark > 85 ? "green" : mark >= 70 ? "orange" : "red";
}

function updateChart() {
    marksChart.data.labels = students;
    marksChart.data.datasets[0].data = marks;
    marksChart.data.datasets[0].backgroundColor = marks.map(getBarColor);
    marksChart.update();
}

function generateTable() {
    let tableHTML = "";
    students.forEach((student, i) => {
        tableHTML += `<tr>
            <td>${student}</td>
            <td>${marks[i]}</td>
            <td class="selectColumn ${selecting ? '' : 'hidden'}">
                <input type="checkbox" class="rowCheckbox" data-index="${i}">
            </td>
        </tr>`;
    });
    document.getElementById("studentTable").innerHTML = tableHTML;
}

const ctx = document.getElementById('marksChart').getContext('2d');
let marksChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: students,
        datasets: [{
            label: 'Marks',
            data: marks,
            backgroundColor: marks.map(getBarColor)
        }]
    }
});

function addStudent() {
    let name = document.getElementById("nameInput").value;
    let mark = parseInt(document.getElementById("marksInput").value);
    if (name && !isNaN(mark)) {
        students.push(name);
        marks.push(mark);
        generateTable();
        updateChart();
    }
}

function toggleSelection() {
    selecting = !selecting;
    document.getElementById("selectHeader").classList.toggle("hidden", !selecting);
    document.querySelectorAll(".selectColumn").forEach(col => col.classList.toggle("hidden", !selecting));
    document.getElementById("deleteBtn").classList.toggle("hidden", !selecting);
}

function deleteSelected() {
    let checkboxes = document.querySelectorAll(".rowCheckbox:checked");
    if (checkboxes.length === 0) return;
    if (!confirm("Are you sure you want to delete the selected students?")) return;

    let indicesToDelete = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index)).sort((a, b) => b - a);
    indicesToDelete.forEach(index => {
        students.splice(index, 1);
        marks.splice(index, 1);
    });

    generateTable();
    updateChart();
    toggleSelection(); // Hide checkboxes after deletion
}

generateTable();
