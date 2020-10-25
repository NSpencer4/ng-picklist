import {
  Component, OnInit,
} from '@angular/core';
import { PicklistData } from '../../../shared/models/picklist.model';
import { PicklistShowcaseConstants } from '../constants/picklist-showcase.constants';
import { mockPickListData } from '../../../testing/test-data';

@Component({
  selector: 'app-picklist-showcase',
  templateUrl: 'picklist-showcase.component.html',
  styleUrls: ['picklist-showcase.component.scss']
})
export class PicklistShowcaseComponent implements OnInit {
  selectablesHeaderText: string = PicklistShowcaseConstants.SELECTABLES_HEADER_TEXT;
  selectedHeaderText: string = PicklistShowcaseConstants.SELECTED_HEADER_TEXT;
  selectedPlaceholderText: string = PicklistShowcaseConstants.SELECTED_PLACEHOLDER_TEXT;
  filterPlaceholderText: string = PicklistShowcaseConstants.FILTER_PLACEHOLDER_TEXT;
  noResultsForFilterTermMessage: string = PicklistShowcaseConstants.NO_RESULTS_FILTER_MESSAGE;
  clearFilterTermText: string = PicklistShowcaseConstants.CLEAR_FILTER_TERM_TEXT;
  codeDemoText: string = PicklistShowcaseConstants.CODE_DEMO_TEXT;
  selectablePickListData: PicklistData[] = [];
  selectedPicklistData: PicklistData[] = [];
  selectedPicklistDataStr: string;
  filterTerm: string = '';

  ngOnInit(): void {
    this.setSelectablePicklistData();
  }

  setSelectablePicklistData(): void {
    this.selectablePickListData = mockPickListData;
  }

  setSelectedPicklistData(selected: PicklistData[]): void {
    this.selectedPicklistData = selected;
    this.selectedPicklistDataStr = JSON.stringify(selected);
  }

}
