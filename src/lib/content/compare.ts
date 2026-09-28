/**
 * The same counter in React and Svelte 5, taken from
 * https://component-party.dev/?f=svelte5-react ("Event click").
 */
export const compare = {
  source: { name: 'component-party.dev', url: 'https://component-party.dev/?f=svelte5-react' },
  react: {
    file: 'Counter.jsx',
    framework: 'React',
    code: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function incrementCount() {
    setCount((count) => count + 1);
  }

  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={incrementCount}>+1</button>
    </>
  );
}`
  },
  svelte: {
    file: 'Counter.svelte',
    framework: 'Svelte',
    code: `<script>
  let count = $state(0);

  function incrementCount() {
    count++;
  }
</script>

<p>Counter: {count}</p>
<button onclick={incrementCount}>+1</button>`
  }
};

export function lineCount(code: string) {
  return code.trimEnd().split('\n').length;
}
