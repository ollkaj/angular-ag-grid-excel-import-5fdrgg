import { CommonColumn } from '../common/common.column';

export class TextColumn extends CommonColumn {

  constructor(
    headerName: string,
    field: string,
    hide = false,
    width = 100,
    minWidth = 60) {
    super(headerName, field);

    this.hide = hide;
    this.width = width;
    this.minWidth = minWidth;
  }
}