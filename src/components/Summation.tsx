import rows from "./MockData";

function summation() {
  let sum = 0;

  for (let i = 0; i < rows.length; i++) {
    sum += rows[i].value;
  }

  return sum;
}
export default summation;
