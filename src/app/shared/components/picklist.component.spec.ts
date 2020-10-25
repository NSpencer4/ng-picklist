import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { PicklistComponent } from './picklist.component';
import { By } from '@angular/platform-browser';
import { PicklistFilterPipe } from '../pipes/picklist-filter.pipe';
import { mockPickListData } from '../../testing/test-data';
import { testExistence, testNonExistence, testProperty, testText, triggerClick } from '../../testing/testing-utils';

describe('Picklist', () => {
  let fixture: ComponentFixture<PicklistComponent>;
  let component: PicklistComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PicklistComponent,
        PicklistFilterPipe,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistComponent);
    component = fixture.componentInstance;
  });
  describe('constructor', () => {
    it('sets selectedItems', () => {
      expect(component.selectedItems).toEqual([]);
    });
    it('sets the default value for sorting', () => {
      expect(component.sortList).toEqual(true);
    });
    it('sets the default value for the filter term', () => {
      expect(component.filterTerm).toEqual('');
    });
  });
  describe('select', () => {
    it('takes in an id for a selected picklist data obj and removes it from the ' +
      'selectables array and places it in the selected array', () => {
      component.selectableItems = mockPickListData;
      spyOn(component, 'notifyParentSelections');
      component.select(mockPickListData[0].id);
      expect(component.notifyParentSelections).toHaveBeenCalled();
      expect(component.selectableItems).not.toContain(mockPickListData[0]);
      expect(component.selectedItems).toContain(mockPickListData[0]);
    });
  });
  describe('remove', () => {
    it('takes in an id for a selected picklist data obj and removes it from the ' +
      'selected array and places it in the selectables array', () => {
      component.selectedItems = mockPickListData;
      spyOn(component, 'notifyParentSelections');
      component.remove(mockPickListData[0].id);
      expect(component.notifyParentSelections).toHaveBeenCalled();
      expect(component.selectableItems).toContain(mockPickListData[0]);
      expect(component.selectedItems).not.toContain(mockPickListData[0]);
    });
  });
  describe('selectAll', () => {
    it('moves all picklist data from the selectables arr into the selected arr', () => {
      component.selectableItems = mockPickListData;
      spyOn(component, 'notifyParentSelections');
      component.selectAll();
      expect(component.notifyParentSelections).toHaveBeenCalled();
      expect(component.selectableItems).toEqual([]);
      expect(component.selectedItems).toEqual(mockPickListData);
    });
    it('moves all picklist data from the selectables arr into the a prefilled selected array', () => {
      component.selectableItems = [mockPickListData[0], mockPickListData[1]];
      component.selectedItems = [mockPickListData[2]];
      spyOn(component, 'notifyParentSelections').and.callThrough();
      component.selectAll();
      expect(component.notifyParentSelections).toHaveBeenCalled();
      expect(component.selectableItems).toEqual([]);
      expect(component.selectedItems).toEqual([mockPickListData[0], mockPickListData[2], mockPickListData[1]]);
    });
  });
  describe('removeAll', () => {
    it('moves all picklist data from the selected arr into the selectables arr', () => {
      component.selectedItems = mockPickListData;
      spyOn(component, 'notifyParentSelections');
      component.removeAll();
      expect(component.notifyParentSelections).toHaveBeenCalled();
      expect(component.selectedItems).toEqual([]);
      expect(component.selectableItems).toEqual(mockPickListData);
    });
  });
  describe('ngOnInit', () => {
    it('calls the sortItems function when sortList is true', () => {
      component.sortList = true;
      spyOn(component, 'sortItems').and.callFake(() => {
        //
      });
      component.ngOnInit();
      expect(component.sortItems).toHaveBeenCalled();
    });
    it('does not call the sortItems function when sortList is false', () => {
      component.sortList = false;
      spyOn(component, 'sortItems').and.callFake(() => {
        //
      });
      component.ngOnInit();
      expect(component.sortItems).not.toHaveBeenCalled();
    });
  });
  describe('sortItems', () => {
    it('sorts the selected and selectable item lists', () => {
      component.selectableItems = [mockPickListData[1], mockPickListData[0]];
      component.selectedItems = [mockPickListData[3], mockPickListData[4]];
      component.sortItems();
      expect(component.selectableItems).toEqual([mockPickListData[0], mockPickListData[1]]);
      expect(component.selectedItems).toEqual([mockPickListData[3], mockPickListData[4]]);
    });
  });
  describe('notifyParentSelections', () => {
    it('emits the new selected data to the parent unsorted', () => {
      component.sortList = false;
      component.selectedItems = mockPickListData;
      spyOn(component.selectedItemsEmitter, 'emit');
      spyOn(component, 'sortItems').and.callFake(() => {
        //
      });
      component.notifyParentSelections();
      expect(component.selectedItemsEmitter.emit).toHaveBeenCalledWith(mockPickListData);
      expect(component.sortItems).not.toHaveBeenCalled();
    });
    it('should notify the parent a sorted list of selected data and ' +
      'should internally sort the selectables', () => {
      component.sortList = true;
      component.selectableItems = [mockPickListData[1], mockPickListData[0]];
      component.selectedItems = [mockPickListData[3], mockPickListData[4]];
      spyOn(component.selectedItemsEmitter, 'emit');
      spyOn(component, 'sortItems').and.callFake(() => {
        //
      });
      component.notifyParentSelections();
      expect(component.selectedItemsEmitter.emit).toHaveBeenCalledWith([mockPickListData[3], mockPickListData[4]]);
      expect(component.sortItems).toHaveBeenCalled();
    });
  });
  describe('template', () => {
    describe('static rendering', () => {
      it('renders the selectablesContainerHeaderText', () => {
        component.selectablesContainerHeaderText = 'selectablesContainerHeaderText';
        fixture.detectChanges();
        testText('#selectables-header', fixture, 'selectablesContainerHeaderText');
      });
      it('renders the selectedContainerHeaderText', () => {
        component.selectedContainerHeaderText = 'selectedContainerHeaderText';
        fixture.detectChanges();
        testText('#selected-header', fixture, 'selectedContainerHeaderText');
      });
      it('renders the no-results-text when there are selectables but no results for the filter term', () => {
        component.noResultsForFilterTermMessage = 'no-results';
        component.filterTerm = 'gambrooooo';
        component.selectableItems = mockPickListData;
        fixture.detectChanges();
        testText('#no-results-text', fixture, 'no-results');
      });
      it('hides the no-results-text when there is no filter criteria and no selectables', () => {
        component.noResultsForFilterTermMessage = 'no-results';
        component.filterTerm = '';
        component.selectableItems = [];
        fixture.detectChanges();
        testNonExistence('#no-results-text', fixture);
      });
      it('hides the no-results-text when there a no results message is not passed', () => {
        component.noResultsForFilterTermMessage = '';
        component.filterTerm = '';
        component.selectableItems = [];
        fixture.detectChanges();
        testNonExistence('#no-results-text', fixture);
      });
      it('renders the selectedContainerPlaceholderText', () => {
        component.selectedContainerPlaceholderText = 'selectedContainerPlaceholderText';
        component.selectedItems = [];
        fixture.detectChanges();
        testText('#placeholder-text', fixture, 'selectedContainerPlaceholderText');
      });
      it('hides the selectedContainerPlaceholderText', () => {
        component.selectedContainerPlaceholderText = 'selectedContainerPlaceholderText';
        component.selectedItems = mockPickListData;
        fixture.detectChanges();
        testNonExistence('#placeholder-text', fixture);
      });
      it('should render the selectable data sorted', () => {
        component.sortList = true;
        component.selectableItems = [...mockPickListData, {id: '(00001139000)', name: 'BAXTER GAMBRO0'}];
        component.selectedItems = [{id: '(00001139000)', name: 'BAXTER GAMBRO0'}, {id: '(00001137000)', name: 'BAXTER GAMBRO0'}];
        component.notifyParentSelections();
        fixture.detectChanges();
        testText('.selectable-text:first-of-type', fixture, '(00001139000) BAXTER GAMBRO0');
        testText('.selected-text:first-of-type', fixture, '(00001137000) BAXTER GAMBRO0');
      });
    });
    describe('picklist functionality and rendering', () => {
      it('renders the select-all-text cta', () => {
        fixture.detectChanges();
        testExistence('#select-all-text', fixture);
        testText('#select-all-text', fixture, 'Select All');
      });
      it('calls the selectAll function onClick', () => {
        spyOn(component, 'selectAll');
        triggerClick('#select-all-text', fixture);
        expect(component.selectAll).toHaveBeenCalled();
      });
      it('enables the select-all-text cta when there are no selectables', () => {
        component.selectableItems = mockPickListData;
        fixture.detectChanges();
        testProperty('#select-all-text', 'disabled', fixture, 'false');
      });
      it('disables the select-all-text cta when there are no selectables', () => {
        component.selectableItems = [];
        fixture.detectChanges();
        testProperty('#select-all-text', 'disabled', fixture, 'true');
      });
      it('renders the remove-all-text cta', () => {
        fixture.detectChanges();
        testExistence('#remove-all-text', fixture);
        testText('#remove-all-text', fixture, 'Remove All');
      });
      it('calls the removeAll function onClick', () => {
        spyOn(component, 'removeAll');
        triggerClick('#remove-all-text', fixture);
        expect(component.removeAll).toHaveBeenCalled();
      });
      it('enables the remove-all-text cta when there are no selectables', () => {
        component.selectedItems = mockPickListData;
        fixture.detectChanges();
        testProperty('#remove-all-text', 'disabled', fixture, 'false');
      });
      it('disables the remove-all-text cta when there are no selectables', () => {
        component.selectedItems = [];
        fixture.detectChanges();
        testProperty('#remove-all-text', 'disabled', fixture, 'true');
      });
      it('renders the select-action ctas', () => {
        component.selectableItems = mockPickListData;
        fixture.detectChanges();
        const selectActionCTAs: DebugElement[] = fixture.debugElement.queryAll(By.css('.select-action'));
        selectActionCTAs.forEach((cta: DebugElement): void => {
          expect(cta.nativeElement.innerHTML).toContain('Select');
        });
        expect(selectActionCTAs.length).toEqual(mockPickListData.length);
      });
      it('should call the select function passing the data id when an onClick event occurs on a select cta ' +
        '& should render the select text and picklist data for each selectable', () => {
        component.sortList = false;
        component.selectableItems = mockPickListData;
        fixture.detectChanges();
        const selectActionCTAs: DebugElement[] = fixture.debugElement.queryAll(By.css('.select-action'));
        selectActionCTAs.forEach((cta: DebugElement, index: number): void => {
          testText('.select-action:first-of-type', fixture, 'Select');
          testText('.selectable-text:first-of-type', fixture, mockPickListData[index].id + ' ' + mockPickListData[index].name);
          triggerClick('.select-action:first-of-type', fixture);
          fixture.detectChanges();
        });
        expect(component.selectableItems).toEqual([]);
        expect(component.selectedItems).toEqual(mockPickListData);
      });
      it('should call the remove function passing the data id when an onClick event occurs on a remove cta ' +
        '& should render the remove text and picklist data for each selected item', () => {
        component.sortList = false;
        component.selectedItems = mockPickListData;
        fixture.detectChanges();
        const selectActionCTAs: DebugElement[] = fixture.debugElement.queryAll(By.css('.remove-action'));
        selectActionCTAs.forEach((cta: DebugElement, index: number): void => {
          testText('.remove-action:first-of-type', fixture, 'Remove');
          testText('.selected-text:first-of-type', fixture, mockPickListData[index].id + ' ' + mockPickListData[index].name);
          triggerClick('.remove-action:first-of-type', fixture);
          fixture.detectChanges();
        });
        expect(component.selectedItems).toEqual([]);
        expect(component.selectableItems).toEqual(mockPickListData);
      });
      it('renders the remove-action ctas', () => {
        component.selectedItems = mockPickListData;
        fixture.detectChanges();
        const removeActionCTAs: DebugElement[] = fixture.debugElement.queryAll(By.css('.remove-action'));
        removeActionCTAs.forEach((cta: DebugElement): void => {
          expect(cta.nativeElement.innerText).toEqual('Remove');
        });
        expect(removeActionCTAs.length).toEqual(mockPickListData.length);
      });
    });
  });
});
