import { useEffect, useRef } from 'react';

export const useInterval = <T,>(callback: T, delay: number | null) => {
	const savedCallback = useRef<T>();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		const tick = () => {
			if (savedCallback.current && savedCallback.current instanceof Function) {
				savedCallback.current();
			}
		};
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
};
