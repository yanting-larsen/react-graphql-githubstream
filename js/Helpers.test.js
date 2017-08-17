import Helpers from './Helpers';

test('undefined query returns empty object', () => {
    expect(Helpers.getParams(undefined)).toEqual({});
});

test('parameter without value', () => {
    const expected = { key: '' }
    expect(Helpers.getParams('?key=')).toEqual(expected);
    expect(Helpers.getParams('#key=')).toEqual(expected);
    expect(Helpers.getParams('key=')).toEqual(expected);
});

test('single parameter gets added to the object', () => {
    const expected = { key: 'value' }
    expect(Helpers.getParams('?key=value')).toEqual(expected);
    expect(Helpers.getParams('#key=value')).toEqual(expected);
    expect(Helpers.getParams('key=value')).toEqual(expected);
});

test('multiple parameters gets added to the object', () => {
    const expected = { key: 'value', k2: 'v2' }
    expect(Helpers.getParams('?key=value&k2=v2')).toEqual(expected);
    expect(Helpers.getParams('#key=value&k2=v2')).toEqual(expected);
    expect(Helpers.getParams('key=value&k2=v2')).toEqual(expected);
});

test('parameter with + convert to space', () => {
    const expected = { key: 'a b c' }
    expect(Helpers.getParams('key=a+b+c')).toEqual(expected);
});

test('parameter with URI encoding is decoded', () => {
    const expected = { key: 'a b c' }
    expect(Helpers.getParams('key=a%20b%20c')).toEqual(expected);
});