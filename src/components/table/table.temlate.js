const CODES = {
    A: 65,
    Z: 90,
};

// function toCell(el, index) {
//     return `
//     <div class="cell" contenteditable="true" data-col="${index}"></div>
//   `;
// }

function toCell(row) {
    return function (_, col) {
        return `
        <div 
            class="cell" 
            contenteditable="true" 
            data-col="${col}" 
            data-type="cell" 
            data-id="${row}:${col}"
        ></div>
        `;
    };
}

function toColumn(col, index) {
    return `
    <div class="column unselectable" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content) {
    const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : '';
    return `
            <div class="row" data-type="resizable">
            <div class="row-info unselectable">
              ${index ? index : ''}
              ${resizer}
             </div>
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

export function createTable(rowsCount = 200, columnsCount = 100) {
    const rows = [];
    const headRow = new Array(columnsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');
    rows.push(createRow('', headRow));

    for (let row = 0; row < rowsCount; row++) {
        const dataRow = new Array(columnsCount)
            .fill('')
            .map(toColumn)
            .map(toCell(row))
            .join('');

        rows.push(createRow((row + 1).toString(), dataRow));
    }

    return rows.join('');
}
