// build.js
const StyleDictionary = require('style-dictionary').extend('config.json');

console.log('Build started...');
console.log('\n==============================================');

StyleDictionary.registerTransform({
	name: 'font/family',
	type: "value",
	transitive: true,
	matcher: (token) => token.type === "fontFamilies",
	transformer: (token) => `'${token.value}'`,
});

StyleDictionary.registerTransform({
	name: 'font/weight',
	type: 'value',
	matcher: function(prop) {
		return prop.original.type === 'fontWeights';
	},
	transformer: function(prop) {
		const fontWeight = prop.original.value;
		switch (fontWeight) {
			case 'Regular':
				return 'normal';
			case 'SemiBold':
				return 600;
			case 'Bold':
				return 700;
			default:
				return 'normal';
		}
	}
});

StyleDictionary.registerTransform({
	name: 'spacing/px',
	type: 'value',
	matcher: function(prop) {
		return prop.attributes.category === 'spacer';
	},
	transformer: function(prop) {
		return parseFloat(prop.original.value) + 'px';
	}
});

StyleDictionary.registerTransform({
	name: 'shadow/type',
	type: 'value',
	matcher: function(prop) {
		return prop.original.type === 'type';
	},
	transformer: function(prop) {
		const dropShadow = prop.original.value;
		switch (dropShadow) {
			case 'dropShadow':
				return "''";
			case 'innerShadow':
				return 'inset';
			default:
				return "''";
		}
	}
});

// REGISTER A CUSTOM FORMAT
StyleDictionary.registerFormat({
	name: 'custom/scss/variables',
	formatter: function({ dictionary }) {
	  return dictionary.allTokens.map(function(token) {
		return `$${token.name}: ${token.value};`;
	  }).join('\n');
	}
});


StyleDictionary.buildAllPlatforms();

console.log(`\nCSS + SCSS variables files created \n`)

//------------------- test

/* unused RADIUS/PX
StyleDictionary.registerTransform({
	name: 'radius/px',
	type: 'value',
	matcher: function(prop) {
		// You can be more specific here if you only want 'px' units for radius
		return prop.attributes.category === 'radius';
	},
	transformer: function(prop) {
		// Modify the value here if you want to convert pixels to pxs
		return parseFloat(prop.original.value) + 'px';
	}
}); */

/* unused SPACING/PX
StyleDictionary.registerTransform({
	name: 'spacing/px',
	type: 'value',
	matcher: function(prop) {
		// You can be more specific here if you only want 'px' units for radius
		return prop.attributes.category === 'spacing-small';
	},
	transformer: function(prop) {
		// Modify the value here if you want to convert pixels to pxs
		return parseFloat(prop.original.value) + 'px';
	}
}); */

/* unused FONT/REM
StyleDictionary.registerTransform({
	name: 'font/rem',
	type: 'value',
	matcher: function(prop) {
		return prop.attributes.category === 'font-size';
	},
	transformer: function(prop, options) {
    const baseFont = (options && options.basePxFontSize) || 16;
		// converts the value from px to rem using 16 as standard 1rem size
		return parseFloat(prop.original.value / baseFont) + 'rem';
	}
}); */