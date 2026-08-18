const sum_to_n_a = (n) => {
  let sum = 0;
  const step = n >= 0 ? 1 : -1;
  for (let i = step; step > 0 ? i <= n : i >= n; i += step) {
    sum += i;
  }
  return sum;
};

const sum_to_n_b = (n) => {
  return (Math.sign(n) * (Math.abs(n) * (Math.abs(n) + 1))) / 2;
};

const sum_to_n_c = (n) => {
  if (n === 0) return 0;
  return n > 0 ? n + sum_to_n_c(n - 1) : n + sum_to_n_c(n + 1);
};

