/**
 * A File With Breakpoints for Responsive Behaviour
 */

const size = {
	mobile: '576px',
	tablet: '768px',
	laptop: '1024px',
	desktop: '2560px',
}

export default {
	mobile: `(min-width: ${size.mobile})`,
	tablet: `(min-width: ${size.tablet})`,
	laptop: `(min-width: ${size.laptop})`,
	desktop: `(min-width: ${size.desktop})`,
}
