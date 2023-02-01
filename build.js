// build.js
const StyleDictionary = require('style-dictionary').extend('config.json');

console.log('📦 Building SCSS and CSS...');

StyleDictionary.registerTransform({
	name: 'font/family',
	type: "value",
	transitive: true,
	matcher: (token) => token.type === "fontFamilies",
	transformer: (token) => {
		if (token.original.value.startsWith('{'))
			return token.value
		else
			return `'${token.value}'`
	},
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

console.log(`\n✅ CSS + SCSS variables files created \n`)
