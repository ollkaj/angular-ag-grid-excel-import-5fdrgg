import { ColDef } from "@ag-grid-community/all-modules";

export abstract class CommonColumn implements ColDef {

  // https://www.ag-grid.com/javascript-grid-column-properties/
  public headerName: string;
  public field: string;
  public filter: string;
  public sort: string;

  public editable: boolean;
  public hide: boolean;
  public headerCheckboxSelection: boolean;
  public lockPosition: boolean;

  public cellClassRules: any;
  public cellEditor: any;
  public cellEditorParams: any;
  public filterParams: any;
  public checkboxSelection: any;
  public cellRenderer: any;
  public menuTabs: any;
  public isRowSelectable: any;

  public onCellValueChanged: any;
  public onCellClicked: any;

  public width: number;
  public minWidth: number;

  constructor(headerName: string,
              field: string,
              sort = null) {
    this.initColDef(headerName, field, sort);
  }

  initColDef(headerName: string, field: string, sort: string) {
    this.headerName = headerName;
    this.field = field;
    this.filter = 'agTextColumnFilter';
    this.sort = sort;
  
    this.editable = false;
    this.hide = false;
  
    this.menuTabs = ['filterMenuTab'];
  }

  public cellValueChanged(params) {
    if (params.oldValue != params.newValue) {
      alert('teste');
      // Validações na alteração de valores das células
    }
  }

  public cellClicked(params) {
    params.columnApi.getColumn(params.colDef.field).getColDef().editable = params.node.data.isEnabled;
  }
}