
import reducer, { SORT, ADD_SORT } from './items_list'

describe('items_list reduser', () => {
  
  it('SORT add', () => {
    const state = {
      items: [],
      order: []
    }
    
    const newState = reducer(state, {type: SORT, payload: "descr"})
    expect(newState.order).toEqual([{field: "descr", direction: "asc"}]);
  })  

  it('SORT change', () => {
    const state = {
      items: [],
      order: [{field: "descr", direction: "asc"}]
    }
    
    const newState = reducer(state, {type: SORT, payload: "descr"})
    expect(newState.order).toEqual([{field: "descr", direction: "desc"}]);
  })  

  it('ADD_SORT add 0', () => {
    const state = {
      items: [],
      order: []
    }
    
    const newState = reducer(state, {type: ADD_SORT, payload: "descr"})
    expect(newState.order).toEqual([{field: "descr", direction: "asc"}]);
  })  
  
  it('ADD_SORT add 1', () => {
    const state = {
      items: [],
      order: [{field: "descr", direction: "asc"}]
    }
    
    const newState = reducer(state, {type: ADD_SORT, payload: "code"})
    expect(newState.order).toEqual([
      {field: "descr", direction: "asc"},
      {field: "code", direction: "asc"},
    ]);
  });

  it('ADD_SORT change', () => {
    const state = {
      items: [],
      order: [{field: "descr", direction: "asc"}]
    }
    
    const newState = reducer(state, {type: SORT, payload: "descr"})
    expect(newState.order).toEqual([{field: "descr", direction: "desc"}]);
  })  

})