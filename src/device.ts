/**
 * A File With Breakpoints for Responsive Behaviour
 */

export const deviceSizes = {
	mobile: '576px',
	tablet: '768px',
	laptop: '1024px',
	desktop: '2560px',
}

export default {
	mobile: `(min-width: ${deviceSizes.mobile})`,
	tablet: `(min-width: ${deviceSizes.tablet})`,
	laptop: `(min-width: ${deviceSizes.laptop})`,
	desktop: `(min-width: ${deviceSizes.desktop})`,
}
