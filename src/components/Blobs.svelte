<div class="fixed left-0 top-0 -z-10 size-full">
	<span class="blob-1"></span>
	<span class="blob-2"></span>
	<span class="blob-3"></span>
	<span class="blob-4"></span>
	<span class="blob-5"></span>
	<span class="blob-6"></span>
</div>

<style>
	div {
		mix-blend-mode: soft-light;
	}

	span {
		position: absolute;
		translate: -50% -50%;
		width: 40%;
		height: 70%;
		display: flex;
	}

	.blob-1 {
		top: 10%;
		left: 10%;
		background-image: radial-gradient(closest-side, cyan, transparent);
	}

	.blob-2 {
		top: 50%;
		left: 20%;
		background-image: radial-gradient(closest-side, yellow, transparent);
	}

	.blob-3 {
		top: 100%;
		left: 10%;
		background-image: radial-gradient(closest-side, magenta, transparent);
	}

  .blob-4 {
		top: 10%;
		left: 100%;
		background-image: radial-gradient(closest-side, yellow, transparent);
	}

	.blob-5 {
		top: 50%;
		left: 80%;
		background-image: radial-gradient(closest-side, magenta, transparent);
	}

	.blob-6 {
		top: 100%;
		left: 100%;
		background-image: radial-gradient(closest-side, cyan, transparent);
	}
</style>
