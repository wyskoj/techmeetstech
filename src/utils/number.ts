export function ordinal(num: number) {
	if (num % 100 >= 10 && num % 100 <= 19) { // "tenth" to "nineteenth" are all "th"
		return "th";
	} else { // standard rules apply
		switch (num % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	}
}