const submitBtn = document.getElementById("submitBtn");
const inputDate = document.getElementById("inputDate");
const parentUlList = document.getElementById("relsultList");
const formDiv = document.getElementById("formDiv");
const paraAlart = document.createElement("p");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const valueDate = inputDate.value;

  if (!valueDate) {
    paraAlart.textContent = "Please first write your birthday date in input then click";
    paraAlart.style.cssText = "color: red; margin-top: 5px;";
    if (!formDiv.contains(paraAlart)) {
      formDiv.appendChild(paraAlart);
    }
    return;
  }

  // Remove alert if exists
  if (formDiv.contains(paraAlart)) {
    formDiv.removeChild(paraAlart);
  }

  const today = new Date();
  const birthDate = new Date(valueDate);

  // Calculate age
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Create list item
  const newListItem = document.createElement("li");
  newListItem.innerHTML = `
    <span>${birthDate.toLocaleDateString("en-GB")} - Age: ${years} years, ${months} months, ${days} days</span>
    <button class="deleteBtn" 
      style="background-color: red; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 14px;">
      Delete
    </button>
  `;

  parentUlList.appendChild(newListItem);

  // Delete functionality
  const deleteBtn = newListItem.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => parentUlList.removeChild(newListItem));

  // Clear input
  inputDate.value = "";
});