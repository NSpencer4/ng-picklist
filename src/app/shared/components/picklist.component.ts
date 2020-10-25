import {
  Component,
  EventEmitter,
  Input, OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { PicklistData } from '../models/picklist.model';
import * as _ from 'lodash';
import { PicklistConstants } from '../constants/picklist.constants';

@Component({
  selector: 'app-picklist',
  templateUrl: 'picklist.component.html',
  styleUrls: ['picklist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PicklistComponent implements OnInit {
  @Input() selectablesContainerHeaderText: string;
  @Input() selectedContainerHeaderText: string;
  @Input() selectedContainerPlaceholderText: string;
  @Input() sortList?: boolean = true;
  @Input() filterTerm?: string = '';
  @Input() noResultsForFilterTermMessage?: string;
  @Input() selectableItems: PicklistData[] = [];
  @Output() selectedItemsEmitter: EventEmitter<PicklistData[]> = new EventEmitter<PicklistData[]>();
  selectedItems: PicklistData[] = [];
  selectOptionText: string = PicklistConstants.SELECT_OPTION;
  selectAllOptionText: string = PicklistConstants.SELECT_ALL_OPTION;
  removeOptionText: string = PicklistConstants.REMOVE_OPTION;
  removeAllOptionText: string = PicklistConstants.REMOVE_ALL_OPTION;

  ngOnInit(): void {
    if (this.sortList) {
      this.sortItems();
    }
  }

  select(selectedId: string): void {
    this.selectableItems =
      this.selectableItems.filter((item: PicklistData) => {
        if (item.id === selectedId) {
          this.selectedItems.push(item);
        }
        return item.id !== selectedId;
      });
    this.notifyParentSelections();
  }

  remove(removedId: string): void {
    this.selectedItems =
      this.selectedItems.filter((item: PicklistData) => {
        if (item.id === removedId) {
          this.selectableItems.push(item);
        }
        return item.id !== removedId;
      });
    this.notifyParentSelections();
  }

  selectAll(): void {
    this.selectedItems = [...this.selectedItems, ...this.selectableItems];
    this.selectableItems = [];
    this.notifyParentSelections();
  }

  removeAll(): void {
    this.selectableItems = [...this.selectableItems, ...this.selectedItems];
    this.selectedItems = [];
    this.notifyParentSelections();
  }

  sortItems(): void {
    this.selectableItems = _.sortBy(this.selectableItems, 'id');
    this.selectedItems = _.sortBy(this.selectedItems, 'id');
  }

  notifyParentSelections(): void {
    if (this.sortList) {
      this.sortItems();
    }
    this.selectedItemsEmitter.emit(this.selectedItems);
  }
}
