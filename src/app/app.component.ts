import { Component, HostListener } from '@angular/core';
import {
  AllCommunityModules,
  GridOptions,
  GridApi,
} from '@ag-grid-community/all-modules';
import { DropdownColumn } from './ag-grid/columns/commons/dropdown/dropdown.column';
import { TextColumn } from './ag-grid/columns/commons/text/text.column';
import { CheckboxColumn } from './ag-grid/columns/commons/checkbox/checkbox.column';
import * as XLSX from 'xlsx';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private gridApi: GridApi;
  private gridColumnApi: any;
  public modules: any;
  public gridOptions: GridOptions;
  public rowData: Array<any>;

  constructor() {
    const valuesMake = ['Ford', 'Toyota'];
    this.modules = AllCommunityModules;

    // https://www.ag-grid.com/javascript-grid-properties/
    this.gridOptions = {
      columnDefs: [
        new CheckboxColumn('', 'selection'),
        new DropdownColumn('Make', 'make', valuesMake, false, 'asc'),
        new TextColumn('Model', 'model'),
        new TextColumn('Price', 'price'),
      ],
      rowSelection: 'multiple',
      rowMultiSelectWithClick: true,
      enableFilter: true,
      enableSorting: true,
      pagination: true,
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  convertDataToProducts(event: any) {
    /* convert data to binary string */
    const data = new Uint8Array(event.target.files);
    //const arr = new Array();

    //for (let i = 0; i !== data.length; ++i) {
    //     arr[i] = String.fromCharCode(data[i]);
    //}

    //const bstr = arr.join('');
    //const XLSX = require('xlsx');
    const workbook = XLSX.read(data, { type: 'array' });
    // const sheet_name_list = workbook.SheetNames;
    // console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
    return workbook;
  }

  populateGrid(file: any) {
    // our data is in the first sheet
    var firstSheetName = file.SheetNames[0];
    var worksheet = file.Sheets[firstSheetName];
    console.log(worksheet);
    // we expect the following columns to be present
    var columns = {
      A: '',
      B: 'Make',
      C: 'Model',
      D: 'Price',
    };

    var rowData = [];

    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;

    // iterate over the worksheet pulling out the columns we're expecting
    while (worksheet['A' + rowIndex]) {
      var row = {};
      Object.keys(columns).forEach(function (column) {
        row[columns[column]] = worksheet[column + rowIndex].w;
      });

      rowData.push(row);

      rowIndex++;
    }

    // finally, set the imported rowData into the grid
    console.log(rowData);
    this.gridOptions.api.setRowData(rowData);
  }

  importExcel(event: any) {
    debugger;
    if (event.target.files.length > 0) {
      const products = this.convertDataToProducts(event);
      console.log('arquivo', products);
      this.populateGrid(products);
    }
  }
}
