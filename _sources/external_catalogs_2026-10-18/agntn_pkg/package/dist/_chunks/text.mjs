function oneLine(value) {
	return value.replaceAll(/[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/gu, " ");
}
export { oneLine };
