import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.temlate';
import {$} from '@core/dom';

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
        if (event.target.dataset.resize) {
            const $resizer = $(event.target);
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();
            const type = $resizer.data.resize;

            $resizer.css({opacity: 1});

            if (type === 'col') {
                const colID = $parent.data.col;
                const colArr = this.$root.findAll(`[data-col="${colID}"]`);

                document.onmousemove = (e) => {
                    const delta = e.pageX - coords.right;
                    const value = coords.width + delta;
                    $parent.css({width: value + 'px'});
                    colArr.forEach((el) => el.style.width = value + 'px');
                };
            } else {
                document.onmousemove = (e) => {
                    const delta = e.pageY - coords.bottom;
                    const value = coords.height + delta;
                    $parent.css({height: value + 'px'});
                };
            }

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
                $resizer.css({opacity: 0});
            };
        }
    }
}
