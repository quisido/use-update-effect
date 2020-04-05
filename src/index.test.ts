import { RenderHookResult, renderHook } from '@testing-library/react-hooks';
import { DependencyList, EffectCallback } from 'react';
import useUpdateEffect from '.';

interface Props {
  deps: DependencyList;
  effect: EffectCallback;
}

const DEPS1: DependencyList = [1, 2, 3];
const DEPS2: DependencyList = [4, 5, 6];
const EMPTY_DEPS: DependencyList = [];
const EFFECT = jest.fn();

const render = (
  effect: EffectCallback,
  deps: DependencyList,
): RenderHookResult<Props, void> =>
  renderHook(({ deps, effect }: Props): void => useUpdateEffect(effect, deps), {
    initialProps: {
      deps,
      effect,
    },
  });

describe('useUpdateEffect', (): void => {
  afterEach((): void => {
    EFFECT.mockClear();
  });

  it('should not trigger on mount', (): void => {
    render(EFFECT, EMPTY_DEPS);
    expect(EFFECT).not.toHaveBeenCalled();
    render(EFFECT, DEPS1);
    expect(EFFECT).not.toHaveBeenCalled();
  });

  it('should not trigger if deps are the same', (): void => {
    const { rerender } = render(EFFECT, DEPS1);
    rerender({ effect: EFFECT, deps: DEPS1 });
    expect(EFFECT).not.toHaveBeenCalled();
  });

  it('should trigger on update', (): void => {
    const { rerender } = render(EFFECT, DEPS1);
    rerender({ effect: EFFECT, deps: DEPS2 });
    expect(EFFECT).toHaveBeenCalledTimes(1);
    expect(EFFECT).toHaveBeenLastCalledWith();
  });
});
