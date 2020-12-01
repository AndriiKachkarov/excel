import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.temlate';
import {tableResizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['click', 'mousedown'],
        });
    }


    toHTML() {
        return createTable();
    }

    onClick(event) {
        // console.log('click', event);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            tableResizeHandler(this.$root, event);
        }
    }
}
