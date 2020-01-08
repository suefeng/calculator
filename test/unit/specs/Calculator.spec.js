import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Calculator from '@/components/Calculator'
const wrapper = shallowMount(Calculator);
describe('Exists', () => {
  it('Check that all 25 buttons exist', () => {
    expect(wrapper.contains('#h')).toBe(true);
    expect(wrapper.contains('#help')).toBe(true);
    expect(wrapper.contains('#back')).toBe(true);
    expect(wrapper.contains('#add')).toBe(true);
    expect(wrapper.contains('#subtract')).toBe(true);
    expect(wrapper.contains('#multiply')).toBe(true);
    expect(wrapper.contains('#divide')).toBe(true);
    expect(wrapper.contains('#clear')).toBe(true);
    expect(wrapper.contains('#plusMinus')).toBe(true);
    expect(wrapper.contains('#mAdd')).toBe(true);
    expect(wrapper.contains('#mSubtract')).toBe(true);
    expect(wrapper.contains('#mRecall')).toBe(true);
    expect(wrapper.contains('#mClear')).toBe(true);
    expect(wrapper.contains('#n0')).toBe(true);
    expect(wrapper.contains('#n1')).toBe(true);
    expect(wrapper.contains('#n2')).toBe(true);
    expect(wrapper.contains('#n3')).toBe(true);
    expect(wrapper.contains('#n4')).toBe(true);
    expect(wrapper.contains('#n5')).toBe(true);
    expect(wrapper.contains('#n6')).toBe(true);
    expect(wrapper.contains('#n7')).toBe(true);
    expect(wrapper.contains('#n8')).toBe(true);
    expect(wrapper.contains('#n9')).toBe(true);
    expect(wrapper.contains('#equal')).toBe(true);
    expect(wrapper.contains('#decimal')).toBe(true);
  });
});
describe('Correct values', () => {
  it('Check that all 25 buttons have correct values', () => {
    expect(wrapper.find('#h').text()).toBe('History');
    expect(wrapper.find('#help').text()).toBe('?');
    expect(wrapper.find('#back').text()).toBe('←');
    expect(wrapper.find('#add').text()).toBe('+');
    expect(wrapper.find('#subtract').text()).toBe('–');
    expect(wrapper.find('#multiply').text()).toBe('×');
    expect(wrapper.find('#divide').text()).toBe('÷');
    expect(wrapper.find('#clear').text()).toBe('c');
    expect(wrapper.find('#plusMinus').text()).toBe('±');
    expect(wrapper.find('#mAdd').text()).toBe('m+');
    expect(wrapper.find('#mSubtract').text()).toBe('m-');
    expect(wrapper.find('#mRecall').text()).toBe('mr');
    expect(wrapper.find('#mClear').text()).toBe('mc');
    expect(wrapper.find('#n0').text()).toBe('0');
    expect(wrapper.find('#n1').text()).toBe('1');
    expect(wrapper.find('#n2').text()).toBe('2');
    expect(wrapper.find('#n3').text()).toBe('3');
    expect(wrapper.find('#n4').text()).toBe('4');
    expect(wrapper.find('#n5').text()).toBe('5');
    expect(wrapper.find('#n6').text()).toBe('6');
    expect(wrapper.find('#n7').text()).toBe('7');
    expect(wrapper.find('#n8').text()).toBe('8');
    expect(wrapper.find('#n9').text()).toBe('9');
    expect(wrapper.find('#equal').text()).toBe('=');
    expect(wrapper.find('#decimal').text()).toBe('.');
  });
});
describe('Click events', () => {
  it('Clicking on a number should return the number value', () => {
    for(let i = 0; i < 10; i++) {
        expect(wrapper.vm.clickedNumber(i)).toBe(i);
    }
  });
  it('Clicking on operation returns operation value', () => {
    expect(wrapper.vm.clickedNumber('+')).toBe('+');
    expect(wrapper.vm.clickedNumber('-')).toBe('-');
    expect(wrapper.vm.clickedNumber('*')).toBe('*');
    expect(wrapper.vm.clickedNumber('/')).toBe('/');
  });
  it('Clicking on ± operation returns - if number is +, and + if number is -', () => {
    expect(wrapper.vm.clickedNumber('/')).toBe('/');
    expect(wrapper.vm.plusMinus(6)).toBe(-6);
    expect(wrapper.vm.plusMinus(-10)).toBe(10);
  });
  it('Clicking on clear operation clears everything', () => {
    wrapper.vm.clickedNumber('9');
    expect(wrapper.vm.clickedClear()).toBe('');
  });
});
describe('Memory related', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'removeItem');
  });
  afterEach(() => {
    localStorage.setItem.mockRestore();
    localStorage.getItem.mockRestore();
    localStorage.removeItem.mockRestore();
  });
  it('Clicking on mAdd adds memory', () => {
    wrapper.vm.mAdd('', 123);
    expect(localStorage.setItem).toHaveBeenCalledWith('calculatorValue', 123);
  });
  it('Clicking on mSubtract removes memory', () => {
    wrapper.vm.mAdd('', 123);
    wrapper.vm.mSubtract();
    expect(localStorage.removeItem('calculatorValue')).toBeUndefined();
  });
  it('Clicking on mRecall recalls memory', () => {
    wrapper.vm.mAdd('', 123);
    wrapper.vm.mRecall();
    expect(localStorage.getItem('calculatorValue')).toBe('123');
  });
});
describe('History related', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'removeItem');
  });
  afterEach(() => {
    localStorage.setItem.mockRestore();
    localStorage.getItem.mockRestore();
    localStorage.removeItem.mockRestore();
  });
  it('Clicking on getHistory adds to localStorage', () => {
    wrapper.vm.clickedSubmit('', '3 + 3');
    wrapper.vm.getHistory(false);
    expect(localStorage.getItem('history')).toContain('3 + 3');
  });
  it('Clicking on clearHistory removes localStorage', () => {
    wrapper.vm.clickedSubmit('', '5 + 3');
    wrapper.vm.clearHistory();
    expect(localStorage.removeItem('history')).toBeUndefined();
  });
});
describe('Miscellaneous', () => {
  it('back button should remove last character', () => {
    expect(wrapper.vm.back(352)).toBe('35');
  });
  it('verification for characters', () => {
    expect(wrapper.vm.verification('352+', '+')).toBe('352+');
    expect(wrapper.vm.verification('352.', '.')).toBe('352.');
    expect(wrapper.vm.verification('352.52', '.')).toBe('352.52');
    expect(wrapper.vm.verification('0', '0')).toBe('0');
    expect(wrapper.vm.verification('', '*')).toBe('');
    expect(wrapper.vm.verification('352', '5')).toBe('3525');
  });
});