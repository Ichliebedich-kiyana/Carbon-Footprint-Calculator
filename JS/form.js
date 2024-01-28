// 维护页面样式
function toggleForm(parameter) {
  let formGroups = document.getElementsByClassName("form-group");
  for (let i = 0; i < formGroups.length; i++) {
    formGroups[i].classList.remove("active-form-group");
  }

  let activeFormGroup = document.getElementById(parameter + "Form");
  activeFormGroup.classList.toggle("active-form-group");
  document.getElementById("carbonForm").style.display = "block";
}

document
  .getElementById("carbonForm")
  .addEventListener("submit", function (event) {
    // 防止提前提交表单
    event.preventDefault();
    // 平均碳足迹排放量:每天10.5千克二氧化碳当量
    let averageEmissionsIndia = 315;
    // 获取页面元素
    let electricityConsumption =
      parseFloat(document.getElementById("electricityConsumption").value) || 0;
    let carDistance =
      parseFloat(document.getElementById("carDistance").value) || 0;
    let carMileage =
      parseFloat(document.getElementById("carMileage").value) || 0;
    let carFuel = document.getElementById("carFuel").value;
    let bikeDistance =
      parseFloat(document.getElementById("bikeDistance").value) || 0;
    let bikeMileage =
      parseFloat(document.getElementById("bikeMileage").value) || 0;
    let meatConsumption =
      parseFloat(document.getElementById("meatConsumption").value) || 0;
    let dairyConsumption =
      parseFloat(document.getElementById("dairyConsumption").value) || 0;
    let wasteGeneration =
      parseFloat(document.getElementById("wasteGeneration").value) || 0;
    let recyclingAmount =
      parseFloat(document.getElementById("recyclingAmount").value) || 0;

    // 单位转换
    let electricityConversionFactor = 0.5; // kg CO2e/kWh
    let petrolConversionFactor = 2.31; // kg CO2e/liter
    let dieselConversionFactor = 2.68; // kg CO2e/liter
    let meatConversionFactor = 10.3; // kg CO2e/kg
    let dairyConversionFactor = 3.2; // kg CO2e/kg
    let wasteConversionFactor = 0.45; // kg CO2e/kg
    let recyclingConversionFactor = -0.5; // kg CO2e/kg

    // 计算碳足迹
    /*
      这些公式基于各种活动或能源消耗与相应的二氧化碳排放因子之间的关系。
      科学依据在于,不同的能源和活动产生二氧化碳排放量是已知的,根据单位消耗或活动量进行线性计算。
      这种方法在许多环境和气候研究中广泛使用，以估计个人、家庭、企业或国家的碳足迹。
    */
    // 电力碳足迹
    let electricityEmissions =
      electricityConsumption * electricityConversionFactor;
    // 汽车碳足迹
    // 判断行驶距离和行驶油耗是否为0，有一个为0则该项碳足迹计算为0
    // 首先将行驶距离（carDistance）除以里程数（carMileage）得到油耗，然后乘以相应的燃料转换因子。
    // 自行车同理
    let carEmissions =
      carDistance && carMileage
        ? (carDistance / carMileage) *
          (carFuel === "petrol"
            ? petrolConversionFactor
            : dieselConversionFactor)
        : 0;
    // 自行车碳足迹
    let bikeEmissions =
      bikeDistance && bikeMileage
        ? (bikeDistance / bikeMileage) * petrolConversionFactor
        : 0;
    // 肉类碳足迹
    let meatEmissions = meatConsumption * meatConversionFactor;
    // 乳制品碳足迹
    let dairyEmissions = dairyConsumption * dairyConversionFactor;
    // 废物碳足迹
    let wasteEmissions = wasteGeneration * wasteConversionFactor;
    // 回收碳足迹
    let recyclingEmissions = recyclingAmount * recyclingConversionFactor;

    // 把所有的排放量加起来就得到了总碳足迹
    let totalEmissions =
      electricityEmissions +
      carEmissions +
      bikeEmissions +
      meatEmissions +
      dairyEmissions +
      wasteEmissions +
      recyclingEmissions;

    // 重定向到结果页面，并将计算的排放量作为URL参数传递
    window.location.href =
      "result.html?emissions=" +
      totalEmissions.toFixed(2) +
      "&averageEmissionsIndia=" +
      averageEmissionsIndia.toFixed(2);
  });
let explainBtn = document.querySelector("#explain");
console.log(explainBtn);
// 弹出对自行车燃油消耗的解释
explainBtn.addEventListener(
  "click",
  function () {
    alert(
      "Bike Mileage (km/liter) 是指自行车每升燃料可以行驶的里程。这个概念通常用于评估自行车的燃油效率。自行车本身不会有油耗，但燃料效率会受到以下因素影响："
    );
    alert(
      "1. 骑手的体重和体力状况：体重较重或体力状况不佳的骑手需要更多的能量，从而导致燃料消耗增加。2. 骑行速度：速度越快，空气阻力越大，需要更多的能量来维持速度，从而导致燃料消耗增加。3. 骑行坡度：在上坡骑行时，需要更多的能量来克服重力，从而导致燃料消耗增加。4. 车辆重量：车辆越重，所需的能量越多，燃料消耗也相应增加。5. 轮胎气压：轮胎气压不足会增加滚动阻力，导致燃料消耗增加。6. 骑行风阻：骑行过程中，风阻也会影响燃料消耗"
    );
    alert(
      "总之，Bike Mileage (km/liter) 是一个综合这些因素的指标，用于表示自行车在特定条件下的燃油效率。要提高燃油效率，可以采取措施如减轻体重、保持良好的体力状况、合理控制骑行速度、确保车辆轻便、维护轮胎气压在合适范围等。"
    );
  },
  false
);
