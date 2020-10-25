import { PicklistFilterPipe } from './picklist-filter.pipe';
import { PicklistData } from '../models/picklist.model';
import { mockPickListData } from '../../testing/test-data';


describe('Picklist filter Pipe', () => {
  let pipe: PicklistFilterPipe = new PicklistFilterPipe();
  it('should take in a picklist arr and a string to filter on returning the array with matching data on the name', () => {
    const filterString: string = '.38';
    const picklistArr: PicklistData[] = mockPickListData;
    const expectedOutput: PicklistData[] = [
      {id: 'Flonase', name: '$23.38'}
    ];
    expect(pipe.transform(picklistArr, filterString)).toEqual(expectedOutput);
  });
  it('should take in a picklist arr and a string to filter on returning the array with matching data on the id', () => {
    const filterString: string = 'rin';
    const picklistArr: PicklistData[] = mockPickListData;
    const expectedOutput: PicklistData[] = [
      {id: 'Motrin', name: '$7.00'}
    ];
    expect(pipe.transform(picklistArr, filterString)).toEqual(expectedOutput);
  });
  it('should take in a picklist arr and a string to filter on returning an empty array for no results', () => {
    const filterString: string = '98327423';
    const picklistArr: PicklistData[] = mockPickListData;
    const expectedOutput: PicklistData[] = [];
    expect(pipe.transform(picklistArr, filterString)).toEqual(expectedOutput);
  });
  it('should take in a picklist arr and a string to filter on returning matching results for the name and id', () => {
    const filterString: string = 'Flonase';
    const picklistArr: PicklistData[] = mockPickListData;
    const expectedOutput: PicklistData[] = [
      {id: 'Flonase', name: '$23.38'}
    ];
    expect(pipe.transform(picklistArr, filterString)).toEqual(expectedOutput);
  });
  it('should take in a picklist arr and a string to filter on returning matching trimmed results for the name and id', () => {
    const filterString: string = 'arit';
    const picklistArr: PicklistData[] = mockPickListData;
    const expectedOutput: PicklistData[] = [
      {id: 'Claritin', name: '$4.99'}
    ];
    expect(pipe.transform(picklistArr, filterString)).toEqual(expectedOutput);
  });
});
