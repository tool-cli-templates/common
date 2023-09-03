import foo from '../src/index';
describe('调用hello', () => {
  it('default hello', () => {
    const result = foo();
    expect(result).toBe('hello world!');
  });
  it('hello to somebody', () => {
    const result = foo('yong');
    expect(result).toBe('hello yong!');
  });
});
