// 从URL参数获取排放值
let urlParams = new URLSearchParams(window.location.search);
let emissions = parseFloat(urlParams.get("emissions"));
let averageEmissionsIndia = parseFloat(urlParams.get("averageEmissionsIndia"));

// 在结果页面上显示排放值
document.getElementById("emissionsValue").innerText = emissions.toFixed(2);

// 创建一个条形图来可视化排放值和平均排放量
let chart = new Chart(document.getElementById("chart"), {
  type: "bar",
  data: {
    labels: ["碳足迹"],
    datasets: [
      {
        label: "你的排放量(公斤二氧化碳)",
        data: [emissions],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        // 鼠标经过时颜色变深
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "同比在美国的平均排放量(公斤二氧化碳)",
        data: [averageEmissionsIndia],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  },
});

// 根据与平均排放量的比较显示警报信息，对比水平：美国：315 kgCO2
let comparisonText = document.getElementById("comparisonText");
if (emissions > averageEmissionsIndia) {
  comparisonText.innerText =
    "您的碳足迹高于印度的平均水平。建议您考虑减少您的碳排放量。";
  comparisonText.style.color = "red";
} else {
  comparisonText.innerText = "恭喜您!您的碳足迹低于印度的平均水平。";
  comparisonText.style.color = "green";
}
