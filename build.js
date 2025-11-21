// build.js
import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary('config.json');
await sd.hasInitialized;


console.log('📦 Building SCSS and CSS...');

sd.registerTransform({
	name: 'font/family',
	type: "value",
	transitive: true,
	matcher: (token) => token.type === "fontFamilies",
	transform: (token) => {
		if (token.original.value.startsWith('{'))
			return token.value
		else
			return `'${token.value}'`
	},
});

sd.registerTransform({
	name: 'font/weight',
	type: 'value',
	matcher: function(prop) {
		return prop.original.type === 'fontWeights';
	},
	transform: function(prop) {
		const fontWeight = prop.original.value;
		switch (fontWeight) {
			case 'Regular':
				return '400';
			case 'SemiBold':
				return 600;
			case 'Bold':
				return 700;
			default:
				return '400';
		}
	}
});

sd.registerTransform({
	name: 'spacing/px',
	type: 'value',
	filter: function(prop) {
		return prop.attributes.category === 'spacer';
	},
	transform: function(prop) {
		return parseFloat(prop.original.value) + 'px';
	}
});

sd.registerTransform({
	name: 'shadow/type',
	type: 'value',
	filter: function(prop) {
		return prop.original.type === 'type';
	},
	transform: function(prop) {
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
sd.registerFormat({
	name: 'custom/scss/variables',
	format: function({ dictionary }) {
	  return dictionary.allTokens.map(function(token) {
		return `$${token.name}: ${token.value};`;
	  }).join('\n');
	}
});

// Convert RGBA to HSLA
// StyleDictionary.registerTransform({
//   name: 'color/hsla',
//   type: 'value',
//   matcher: (prop) => prop.attributes.category === 'color',
//   transformer: (prop) => {
//     const color = tinycolor(prop.value);
//     const hsl = color.toHsl();
//     return `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%, ${hsl.a})`;
//   }
// });

await sd.buildAllPlatforms();

console.log(`\n✅ CSS + SCSS variables files created \n`)
