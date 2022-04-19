import { CommonColumn } from '../common/common.column';

export class CheckboxColumn extends CommonColumn {

  constructor(
    headerName: string,
    field: string,
    hide = false,
    width = 40,
    minWidth = 40) {
    super(headerName, field);

    this.headerCheckboxSelection = true,
    this.checkboxSelection = (params) => { // Só deixa exibir as linhas isEnabled
      return params.node.data.isEnabled
    },
    this.lockPosition = true,
    this.cellRenderer = (params) => {
      if (!params.node.data.isEnabled) { // Renderiza um checkbox desabilitado nas linhas isEnabled=false
          return `<input type="checkbox" disabled />`;
      }
    }

    this.hide = hide;
    this.width = width;
    this.minWidth = minWidth;
  }
}