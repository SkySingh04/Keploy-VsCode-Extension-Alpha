<script>
    let count = 0;

    function increment() {
        count += 1;
    }
</script>

<main>
    <h1>Hello World!</h1>
    <p>Counter: {count}</p>
    <button on:click={increment}>Increment</button>
</main>

<style>
    main {
        text-align: center;
        padding: 2rem;
    }

    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
    }
</style>