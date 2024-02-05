/**
 * xterm-fit
 */
var term = new Terminal();

term.open(document.getElementById('terminal'));

for (let i = 0; i < 300; i++) {
  term.write(`Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ${i}  \r\n`);
}

const observer = new ResizeObserver(entries => {
  const cellWidth = term._core._renderService.dimensions.actualCellWidth;
  const cellHeight = term._core._renderService.dimensions.actualCellHeight;
  const cols = Math.floor(entries[0].contentRect.width / cellWidth);
  const rows = Math.floor(entries[0].contentRect.height / cellHeight);

  term.resize(cols, rows - 2);
});
observer.observe(document.querySelector('#secondPanel'));
