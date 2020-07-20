const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
    <div class="cell" contenteditable="true"></div>
  `;
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `;
}

function createRow(index, content) {
  return `
            <div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
        </div>
  `;
}

function toChar(_, idx) {
  const length = CODES.Z - CODES.A + 1;
  idx++;
  let str = '';

  while (idx > length) {
    const remainder = idx % length;
    if (remainder) {
      str = String.fromCharCode(CODES.A + remainder - 1) + str;
      idx = (idx - remainder) / length;
    } else {
      str = String.fromCharCode(CODES.A + length - 1) + str;
      idx = idx / length - 1;
    }
  }

  return String.fromCharCode(CODES.A + idx - 1) + str;
}

export function createTable(rowsCount = 15, columnsCount = 3000) {
  const rows = [];
  const headRow = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow('', headRow));

  for (let i = 0; i < rowsCount; i++) {
    const dataRow = new Array(columnsCount)
        .fill('')
        .map(toColumn)
        .map(toCell)
        .join('');

    rows.push(createRow((i + 1).toString(), dataRow));
  }

  return rows.join('');
}
