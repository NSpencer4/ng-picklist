import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { PicklistShowcaseComponent } from './picklist-showcase.component';
import { mockPickListData } from '../../../testing/test-data';
import { PicklistData } from '../../../shared/models/picklist.model';
import {
  setElementText, testAttribute,
  testDataBinding,
  testExistence,
  testProperty,
  testText,
  triggerClick,
  triggerEvent
} from '../../../testing/testing-utils';
import { By } from '@angular/platform-browser';

describe('Picklist Showcase', () => {
  let fixture: ComponentFixture<PicklistShowcaseComponent>;
  let component: PicklistShowcaseComponent;

  @Component({
    template: '',
    selector: 'app-picklist'
  })
  class MockPickListComponent {
    @Input() selectablesContainerHeaderText: string;
    @Input() selectedContainerHeaderText: string;
    @Input() filterTerm: string;
    @Input() selectedContainerPlaceholderText: string;
    @Input() noResultsForFilterTermMessage: string;
    @Input() selectableItems: PicklistData[];
    @Output() selectedItemsEmitter: EventEmitter<PicklistData[]> = new EventEmitter<PicklistData[]>();
  }

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PicklistShowcaseComponent,
        MockPickListComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistShowcaseComponent);
    component = fixture.componentInstance;
  });
  describe('constructor', () => {
    it('should instantiate the component', () => {
      expect(component).toBeTruthy();
    });
    it('should set the selectablesHeaderText', () => {
      expect(component.selectablesHeaderText).toEqual('Select From');
    });
    it('should set the selectedHeaderText', () => {
      expect(component.selectedHeaderText).toEqual('Selected');
    });
    it('should set the selectedPlaceholderText', () => {
      expect(component.selectedPlaceholderText).toEqual('Selected Products');
    });
    it('should set the filterPlaceholderText', () => {
      expect(component.filterPlaceholderText).toEqual('Filter');
    });
    it('should set the noResultsForFilterTermMessage', () => {
      expect(component.noResultsForFilterTermMessage).toEqual('No results found for: ');
    });
    it('should set the clearFilterTermText', () => {
      expect(component.clearFilterTermText).toEqual('Clear');
    });
    it('should set the selectablePickListData to empty', () => {
      expect(component.selectablePickListData).toEqual([]);
    });
    it('should set the selectedPicklistData to empty', () => {
      expect(component.selectedPicklistData).toEqual([]);
    });
    it('should set the codeDemoText to Selected Data:', () => {
      expect(component.codeDemoText).toEqual('Selected Data:');
    });
    it('should set the selectedPicklistData to an empty string', () => {
      expect(component.filterTerm).toEqual('');
    });
  });
  describe('ngOnInit', () => {
    it('should call the setSelectablePicklistData on init', () => {
      spyOn(component,'setSelectablePicklistData');
      component.ngOnInit();
      expect(component.setSelectablePicklistData).toHaveBeenCalled();
    });
  });
  describe('setSelectablePicklistData', () => {
    it('should set the selectable data with sample data', () => {
      component.setSelectablePicklistData();
      expect(component.selectablePickListData).toEqual(mockPickListData);
    });
  });
  describe('setSelectedPicklistData', () => {
    it('should set the selected data with a passed in picklist data set', () => {
      component.setSelectedPicklistData(mockPickListData);
      expect(component.selectedPicklistData).toEqual(mockPickListData);
    });
    it('should set the selected data string with a passed in picklist data set stringified', () => {
      component.setSelectedPicklistData(mockPickListData);
      expect(component.selectedPicklistDataStr).toEqual(JSON.stringify(mockPickListData));
    });
  });
  describe('template', () => {
    it('should render the picklist', () => {
      component.selectablePickListData = mockPickListData;
      fixture.detectChanges();
      testExistence('app-picklist', fixture);
      testDataBinding('app-picklist',
        'selectablesContainerHeaderText',
        fixture,
        'Select From');
      testDataBinding('app-picklist',
        'selectedContainerHeaderText',
        fixture,
        'Selected');
      testDataBinding('app-picklist',
        'selectedContainerPlaceholderText',
        fixture,
        'Selected Products');
      testDataBinding('app-picklist',
        'selectableItems',
        fixture,
        mockPickListData
      );
      testDataBinding('app-picklist',
        'noResultsForFilterTermMessage',
        fixture,
        'No results found for: '
      );
      component.filterTerm = 'bro1';
      fixture.detectChanges();
      testDataBinding('app-picklist',
        'filterTerm',
        fixture,
        'bro1'
      );
    });
    it('should render the select heading', () => {
      fixture.detectChanges();
      testText('[data-id="clear-filter"]', fixture, 'Clear');
    });
    it('should render the demo text heading', () => {
      fixture.detectChanges();
      testText('#demo-text-header', fixture, 'Selected Data:');
    });
    it('should render the demo code selected object', () => {
      component.selectedPicklistData = mockPickListData;
      component.selectedPicklistDataStr = JSON.stringify(mockPickListData);
      fixture.detectChanges();
      testText('#demo-code', fixture, JSON.stringify(mockPickListData));
    });
    it('should render the filter-term placeholder text', () => {
      fixture.detectChanges();
      testAttribute('[data-id="filter-term-input"]',
        'placeholder',
        fixture,
        'Filter');
    });
    it('should render the searchTerm-input and bind the input property for updating the filterTerm', () => {
      fixture.detectChanges();
      setElementText('[data-id="filter-term-input"]', fixture, 'adv');
      triggerEvent('[data-id="filter-term-input"]', fixture, 'input');
      expect(component.filterTerm).toEqual('adv');
    });
    it('should set the filter term to empty string when clear search is clicked', () => {
      component.filterTerm = 'adv';
      fixture.detectChanges();
      triggerClick('[data-id="clear-filter"]', fixture);
      expect(component.filterTerm).toEqual('');
    });
    it('should set the clear search button to disabled when the term is ""', () => {
      component.filterTerm = '';
      fixture.detectChanges();
      testProperty('[data-id="clear-filter"]', 'disabled', fixture, 'true');
    });
    it('should set the clear search button to disabled when the term is "" by clicking clear', () => {
      component.filterTerm = 'adv';
      fixture.detectChanges();
      triggerClick('[data-id="clear-filter"]', fixture);
      testProperty('[data-id="clear-filter"]', 'disabled', fixture, 'true');
    });
    it('should have the clear search button be enabled if there is a filer term', () => {
      component.filterTerm = 'adv';
      fixture.detectChanges();
      testProperty('[data-id="clear-filter"]', 'disabled', fixture, 'false');
    });
    it('should handle emitted data from the picklist by calling setSelectedPicklistData', () => {
      spyOn(component, 'setSelectedPicklistData');
      const mockPicklistComponent: MockPickListComponent
        = fixture.debugElement.query(By.css('app-picklist')).componentInstance;
      mockPicklistComponent.selectedItemsEmitter.emit(mockPickListData);
      expect(component.setSelectedPicklistData).toHaveBeenCalledWith(mockPickListData);
    });
  });
});
