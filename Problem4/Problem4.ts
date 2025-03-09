function sum_to_n_a(n: number): number {
	// your code here
	// Big O = O(1)
	return (n * (n + 1)) / 2;
}

function sum_to_n_b(n: number): number {
	// your code here
	// Big O = O(n)
	let sum = 0;
	for (let i = 1; i <= n; i++) {
		sum += i;
	}
	return sum;
}

function sum_to_n_c(n: number): number {
	// your code here
	// Big O = O(n)
	if (n <= 0) return 0;
	if (n === 1) return 1;
	return n + sum_to_n_c(n - 1);
}