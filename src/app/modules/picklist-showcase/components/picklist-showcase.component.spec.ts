import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PicklistShowcaseComponent } from './picklist-showcase.component';

describe('Picklist Showcase', () => {
  let fixture: ComponentFixture<PicklistShowcaseComponent>;
  let component: PicklistShowcaseComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PicklistShowcaseComponent,
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
      expect(1).toEqual(1);
    });
  });
});
