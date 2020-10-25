import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

export function testText<T>(selector: string, fixture: ComponentFixture<T>, expectedText: string): void {
  const element: HTMLElement = fixture.debugElement.query(By.css(selector)).nativeElement;
  expect(element).toContain(expectedText);
}

export function testClassExistence<T>(selector: string, fixture: ComponentFixture<T>, expectedClass: string): void {
  const element: HTMLElement = fixture.debugElement.query(By.css(selector)).nativeElement;
  expect(element.className).toContain(expectedClass);
}

export function testClassNonExistence<T>(selector: string, fixture: ComponentFixture<T>, expectedClass: string): void {
  const element: HTMLElement = fixture.debugElement.query(By.css(selector)).nativeElement;
  expect(element.className).not.toContain(expectedClass);
}

export function testExistence<T>(selector: string, fixture: ComponentFixture<T>): void {
  const element: DebugElement = fixture.debugElement.query(By.css(selector));
  expect(element).toBeTruthy();
}

export function testNonExistence<T>(selector: string, fixture: ComponentFixture<T>): void {
  const element: DebugElement = fixture.debugElement.query(By.css(selector));
  expect(element).toBeFalsy();
}

export function testDataBinding<T>(selector: string, boundProperty: string,
                                   fixture: ComponentFixture<T>, expectedValue: {} | string | number | boolean): void {
  const el: DebugElement = fixture.debugElement.query(By.css(selector));
  expect(el.componentInstance[boundProperty]).toEqual(expectedValue);
}

export function testAttribute<T>(selector: string, boundProperty: string,
                                 fixture: ComponentFixture<T>, expectedValue: {} | string | number | boolean): void {
  const el: DebugElement = fixture.debugElement.query(By.css(selector));
  expect(el.nativeElement.attributes.getNamedItem(boundProperty).value).toEqual(expectedValue);
}

export function testProperty<T>(selector: string, boundProperty: string,
                                fixture: ComponentFixture<T>, expectedValue: {} | string | number | boolean): void {
  const el: DebugElement = fixture.debugElement.query(By.css(selector));
  expect(el.properties[boundProperty].toString()).toEqual(expectedValue.toString());
}

export function triggerClick<T>(selector: string, fixture: ComponentFixture<T>): void {
  const element: DebugElement = fixture.debugElement.query(By.css(selector));
  element.nativeElement.dispatchEvent(new Event('click'));
  fixture.detectChanges();
}

export function setElementText<T>(selector: string, fixture: ComponentFixture<T>, value: string): void {
  const element: DebugElement = fixture.debugElement.query(By.css(selector));
  element.nativeElement.value = value;
  fixture.detectChanges();
}

export function triggerEvent<T>(selector: string, fixture: ComponentFixture<T>, eventKey: string): void {
  const element: DebugElement = fixture.debugElement.query(By.css(selector));
  element.nativeElement.dispatchEvent(new Event(eventKey));
  fixture.detectChanges();
}
